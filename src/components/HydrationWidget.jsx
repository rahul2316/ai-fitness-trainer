import { Droplets, Plus, Minus, Waves } from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { motion, AnimatePresence } from "framer-motion";

export default function HydrationWidget() {
    const { hydration, updateHydration } = useFitness();

    const goal = 8;
    const percentage = Math.min(100, (hydration / goal) * 100);

    return (
        <div className="card-premium border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 relative overflow-hidden group h-full flex flex-col justify-between">
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

            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Waves className="w-40 h-40 text-blue-400" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/5">
                            <Droplets className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">Hydration Matrix</h3>
                            <p className="text-[8px] text-muted font-black uppercase tracking-[0.4em] mt-1">H2O Saturation Protocol</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-muted uppercase tracking-widest leading-none">Status</p>
                        <p className={`text-xs font-black uppercase tracking-widest mt-1 ${percentage >= 100 ? 'text-emerald-400' : 'text-blue-400'}`}>
                            {percentage >= 100 ? 'Saturated' : 'Synchronizing'}
                        </p>
                    </div>
                </div>

                <div className="flex items-baseline gap-4 mb-10">
                    <h2 className="text-7xl font-black text-white italic tracking-tighter leading-none">{hydration}</h2>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-muted uppercase tracking-widest leading-none">/ {goal}</span>
                        <span className="text-[8px] font-black text-muted uppercase tracking-[0.5em] mt-2">Doses Authorized</span>
                    </div>
                </div>

                {/* Technical Progress View */}
                <div className="space-y-4 mb-10">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex gap-1.5">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-md border transition-all duration-500 ${i < hydration ? 'bg-blue-500 border-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-white/5 border-white/10'}`}
                                ></div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-white italic tabular-nums">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 relative z-10">
                <button
                    onClick={() => updateHydration(1)}
                    className="flex-grow bg-white text-black py-5 rounded-3xl flex items-center justify-center gap-3 hover:bg-blue-400 transition-all font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/5 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Input Dose
                </button>
                <button
                    onClick={() => updateHydration(-1)}
                    className="px-8 bg-white/5 text-white py-5 rounded-3xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 active:scale-90"
                >
                    <Minus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
