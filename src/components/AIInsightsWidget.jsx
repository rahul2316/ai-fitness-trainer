import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

export default function AIInsightsWidget({ insights, loading = false }) {
    if (loading) {
        return (
            <div className="card-premium p-6 md:p-8 rounded-[2rem] border border-border bg-card/40 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20 shadow-sm">
                        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                    </div>
                    <h3 className="text-sm font-black text-text uppercase italic tracking-[0.3em]">AI_SYNAPSE_IDLE</h3>
                </div>
                <div className="space-y-3">
                    {[1, 2].map(i => (
                        <div key={i} className="h-16 bg-card/60 rounded-2xl animate-pulse border border-border/50" />
                    ))}
                </div>
            </div>
        );
    }

    if (!insights || insights.length === 0) {
        return null;
    }

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-emerald-400" />;
            case "warning":
                return <AlertCircle className="w-5 h-5 text-amber-400" />;
            case "alert":
                return <TrendingDown className="w-5 h-5 text-red-400" />;
            default:
                return <TrendingUp className="w-5 h-5 text-accent" />;
        }
    };

    const getColors = (type) => {
        switch (type) {
            case "success":
                return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
            case "warning":
                return "bg-amber-500/10 border-amber-500/30 text-amber-400";
            case "alert":
                return "bg-red-500/10 border-red-500/30 text-red-400";
            default:
                return "bg-accent/10 border-accent/30 text-accent";
        }
    };

    return (
        <div className="card-premium p-6 md:p-8 rounded-[2rem] border border-border relative overflow-hidden group shadow-xl bg-card/40">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                <Sparkles className="w-40 h-40 text-accent" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20 shadow-xl shadow-accent/5">
                        <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-[0.65rem] font-black text-text uppercase italic tracking-[0.4em] opacity-80">AI_INTELLIGENCE_STREAM</h3>
                </div>

                {/* Insights */}
                <div className="space-y-2">
                    {insights.slice(0, 3).map((insight, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className={`p-4 rounded-2xl border ${getColors(insight.type)} transition-all shadow-sm group/insight hover:scale-[1.02]`}
                        >
                            <div className="flex items-start gap-3.5">
                                <div className="flex-shrink-0 mt-0.5 scale-110">
                                    {getIcon(insight.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[0.6rem] font-black text-text uppercase italic tracking-[0.3em] mb-1.5 opacity-90">
                                        {insight.title}
                                    </h4>
                                    <p className="text-xs text-muted font-black uppercase tracking-tight leading-relaxed opacity-60 italic">
                                        {insight.message}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
