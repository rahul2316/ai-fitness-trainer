import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-card/90 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-red-500/20">
                                <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{title}</h2>
                            <p className="text-muted font-bold uppercase tracking-tight text-sm leading-relaxed mb-10">
                                {message}
                            </p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={onClose}
                                    className="py-4 glass border-white/10 text-white rounded-3xl font-black uppercase tracking-tighter text-xs hover:bg-white/5 transition-all"
                                >
                                    Terminate Action
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="py-4 bg-red-500 text-white rounded-3xl font-black uppercase tracking-tighter text-xs hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                                >
                                    Confirm Deletion
                                </button>
                            </div>
                        </div>

                        <button onClick={onClose} className="absolute top-8 right-8 text-muted hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
