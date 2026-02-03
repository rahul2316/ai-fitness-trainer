import DashboardLayout from "../layouts/DashboardLayout";
import ChatBubble from "../components/ChatBubble";
import { useState, useRef, useEffect } from "react";
import { getAIResponseStream } from "../services/ai";
import { Link } from "react-router-dom";
import { Lock, Bot, Send, Sparkles, Activity, Cpu, ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";

import { useFitness } from "../context/FitnessContext";

export default function AICoach() {
  const { userProfile, dietPlan, workoutRoutine } = useFitness();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "AI Sync established. I am your AI Personal Trainer. How can I help you with your fitness goals today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const messagesEndRef = useRef(null);

  const isAdvanced = userProfile?.subscriptionTier === "advanced";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !isAdvanced) return;

    const userText = input;

    // Construct context-aware prompt
    let fullPrompt = userText;
    if (messages.length === 1) {
      const context = `
      Context:
      User: ${userProfile?.name || "User"}, Goal: ${userProfile?.goal || "Fitness"}.
      Current Workout: ${workoutRoutine ? workoutRoutine.name : "None"}.
      Current Diet: ${dietPlan ? dietPlan.length + " meals planned" : "None"}.
      `;
      fullPrompt = `${context}\n\nUser Question: ${userText}`;
    }

    const userMsg = { role: "user", text: userText };
    const placeholderAiMsg = { role: "ai", text: "..." };

    setMessages((prev) => [...prev, userMsg, placeholderAiMsg]);
    setInput("");
    setLoading(true);

    try {
      await getAIResponseStream(fullPrompt, (streamedText) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: "ai", text: streamedText };
          return newMessages;
        });
      });
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: "ai", text: "Critical System Error. Uplink Failed." };
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto flex flex-col h-[85dvh] md:h-[calc(100vh-10rem)] min-h-0 w-full">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-accent transition-colors group mb-2 md:mb-4 flex-shrink-0">
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex flex-row items-center justify-between mb-3 flex-shrink-0 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-1 h-8 bg-accent rounded-full flex-shrink-0"></div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-white uppercase truncate">AI Trainer</h1>
                <p className="text-[8px] text-muted font-bold uppercase tracking-widest mt-0.5 truncate">Transformation Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-center flex-shrink-0">
              {isAdvanced && (
                <button
                  onClick={() => setIsExtended(true)}
                  className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all text-muted hover:text-white"
                  title="Extend View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
              {isAdvanced && (
                <div className="hidden md:flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Cpu className="w-3 h-3 text-accent" />
                  </div>
                  <p className="text-[7px] font-black text-muted uppercase tracking-widest">AI ONLINE</p>
                </div>
              )}
            </div>
          </div>

          {!isAdvanced ? (
            <div className="flex-1 flex items-center justify-center p-4 md:p-12 card-premium backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group min-h-0">
              <div className="absolute inset-0 bg-grid opacity-20"></div>
              <div className="absolute top-0 right-0 p-8 md:p-20 opacity-5 -translate-y-6 translate-x-6 md:-translate-y-12 md:translate-x-12 pointer-events-none">
                <Bot className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] text-accent" />
              </div>

              <div className="max-w-md text-center space-y-4 relative z-10 w-full px-4">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-accent/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-4 relative border border-accent/20 shadow-2xl shadow-accent/5">
                  <Lock className="w-6 h-6 md:w-10 md:h-10 text-accent animate-pulse" />
                  <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">Training Locked</h2>
                  <p className="text-muted font-bold text-[10px] md:text-xs leading-relaxed uppercase tracking-tight">
                    AI Assistant is for <span className="text-accent underline decoration-2 underline-offset-4">Advanced members</span> only.
                  </p>
                </div>
                <Link
                  to="/plans"
                  className="w-full py-3 md:py-4 bg-white text-black font-black uppercase tracking-tighter rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 hover:bg-accent transition-all shadow-xl active:scale-95 italic text-xs md:text-sm"
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  View Plans
                </Link>
              </div>
            </div>
          ) : (
            <div className="card-premium backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-3 md:p-6 flex-1 flex flex-col min-h-0 relative overflow-hidden h-full w-full">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

              {/* Decorative Bot icon - Reduced size and opacity to prevent conflict */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <Bot className="w-32 h-32 md:w-64 md:h-64 text-accent" />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 md:pr-2 scrollbar-none relative z-10 w-full text-sm">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      key={i}
                    >
                      <ChatBubble role={msg.role} text={msg.text} compact={true} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 p-2 md:p-3 rounded-2xl text-[8px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                      Thinking...
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* Input Area */}
              <div className="mt-3 relative z-10 px-0 md:px-2 flex-shrink-0 w-full">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-emerald-400/20 rounded-[1.5rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask your AI Trainer..."
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 p-3 pl-4 pr-12 md:p-4 md:pl-5 md:pr-14 rounded-xl md:rounded-2xl outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all text-white font-bold text-xs md:text-sm placeholder:opacity-20 min-w-0"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-black p-2 md:p-2.5 rounded-lg md:rounded-xl font-black hover:bg-accent disabled:opacity-5 transition-all shadow-lg active:scale-95 flex-shrink-0"
                  >
                    <Send className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
                <div className="flex justify-center mt-2 md:mt-3">
                  <div className="flex items-center gap-2 opacity-20">
                    <div className="h-[1px] w-4 md:w-6 bg-white"></div>
                    <p className="text-[6px] font-black text-white uppercase tracking-[0.4em]">Secure</p>
                    <div className="h-[1px] w-4 md:w-6 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Extended View Modal */}
        <AnimatePresence>
          {isExtended && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-card border border-white/10 w-full max-w-6xl h-full rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-accent rounded-full"></div>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">AI Trainer PRO</h2>
                  </div>
                  <button
                    onClick={() => setIsExtended(false)}
                    className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-muted hover:text-white"
                  >
                    <Minimize2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                      >
                        <ChatBubble role={msg.role} text={msg.text} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                        AI Assistant is thinking...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </div>

                <div className="p-8 bg-black/40 border-t border-white/5">
                  <div className="max-w-4xl mx-auto relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask anything..."
                      disabled={loading}
                      className="w-full bg-white/5 border border-white/10 p-6 pr-20 rounded-3xl outline-none focus:border-accent/40 text-white font-bold"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-xl hover:bg-accent disabled:opacity-5 transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </DashboardLayout>
  );
}
