import { Droplets, Plus, Minus, Waves } from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";

export default function HydrationWidget() {
    const { hydration, updateHydration } = useFitness();

    const goal = 8;
    const percentage = Math.min(100, (hydration / goal) * 100);

    return (
        <div className="card-premium border border-border rounded-[2rem] p-6 md:p-8 relative overflow-hidden group h-full flex flex-col justify-between bg-card/40 shadow-xl">
            {/* Background Liquid Surface */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: `${100 - percentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                className="absolute inset-x-0 bottom-0 bg-blue-500/10 -z-10 pointer-events-none"
                style={{ height: '100%' }}
            >
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
            </motion.div>

            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Waves className="w-20 h-20 text-blue-400" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-sm">
                            <Droplets className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-text uppercase italic tracking-tighter leading-none">HYDRATION</h3>
                            <p className="text-[0.6rem] text-accent font-black uppercase tracking-[0.4em] mt-2 opacity-80">BIO_MATRIX</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-[0.55rem] text-muted font-black uppercase tracking-[0.4em] leading-none opacity-50">SYNC_STAT</p>
                        <p className={`text-[0.6rem] font-black uppercase tracking-[0.3em] mt-2 ${percentage >= 100 ? 'text-emerald-400' : 'text-blue-400'} italic`}>
                            {percentage >= 100 ? 'SATURATED' : 'SYNCING'}
                        </p>
                    </div>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                    <h2 className="text-4xl md:text-5xl font-black text-text italic tracking-tighter leading-none">{hydration}</h2>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-muted uppercase tracking-[0.2em] leading-none opacity-40">/ {goal}</span>
                        <span className="text-[0.55rem] font-black text-muted uppercase tracking-[0.4em] mt-2 opacity-40">UNITS</span>
                    </div>
                </div>

                {/* Technical Progress View */}
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1.5">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2.5 h-2.5 rounded-sm border transition-all duration-700 ${i < hydration ? 'bg-blue-500 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]' : 'bg-card/60 border-border shadow-inner'}`}
                                ></div>
                            ))}
                        </div>
                        <span className="text-[0.65rem] font-black text-text italic tabular-nums tracking-widest opacity-80">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-2 w-full bg-card/60 rounded-full overflow-hidden border border-border shadow-inner relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 relative z-10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-2 relative z-10">
                <button
                    onClick={() => updateHydration(1)}
                    className="flex-grow bg-text text-bg py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-bg transition-all font-black uppercase tracking-[0.2em] text-[0.65rem] shadow-xl active:scale-95 group italic"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    INJECT_CYCLE
                </button>
                <button
                    onClick={() => updateHydration(-1)}
                    className="px-4 bg-card/40 text-text rounded-2xl flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all border border-border active:scale-90 shadow-sm"
                >
                    <Minus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
