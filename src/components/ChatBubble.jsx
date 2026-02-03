import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";

export default function ChatBubble({ role, text, compact = false }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-4`}>
      {!isUser && (
        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20 flex-shrink-0 mb-1">
          <Bot className="w-5 h-5 text-accent" />
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative transition-all duration-300 overflow-hidden
        ${compact ? "px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm" : "px-6 py-4 md:px-8 md:py-6 text-sm"}
        ${isUser
            ? "bg-white text-black rounded-br-none font-black uppercase italic tracking-tight break-words"
            : "bg-white/5 text-gray-200 rounded-bl-none border border-white/5 backdrop-blur-md break-words"
          }`}
      >
        {isUser ? (
          <div className="flex flex-col gap-1">
            <span className="text-[8px] opacity-40 mb-1">USER_INPUT_NODE</span>
            {text}
          </div>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none 
              prose-p:my-2 prose-headings:my-4 prose-ul:my-2 prose-li:my-1
              prose-strong:text-accent prose-strong:font-black prose-a:text-accent prose-code:text-accent prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
            <div className="text-[8px] font-black text-accent/50 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent/30 rounded-full"></span>
              NEURAL_FEEDBACK_TRANSMISSION
            </div>
            <ReactMarkdown>
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0 mb-1">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
