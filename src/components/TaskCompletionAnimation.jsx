import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Zap, Trophy } from "lucide-react";
import { useEffect } from "react";

export default function TaskCompletionAnimation({ show, taskName, xpGained = 10 }) {
    useEffect(() => {
        if (show) {
            // Trigger confetti
            const duration = 2000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#a3ff12', '#ffffff', '#00ff88']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#a3ff12', '#ffffff', '#00ff88']
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [show]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-card/95 backdrop-blur-2xl border border-accent/40 rounded-[3rem] p-12 shadow-2xl shadow-accent/20"
            >
                {/* Success icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-accent rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/30"
                >
                    <Check className="w-12 h-12 text-black" />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">
                        Task Complete!
                    </h3>
                    <p className="text-sm text-muted font-bold uppercase tracking-tight mb-6">
                        {taskName}
                    </p>

                    {/* XP Gained */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-accent/20 rounded-2xl border border-accent/30"
                    >
                        <Zap className="w-5 h-5 text-accent" />
                        <span className="text-xl font-black text-accent">+{xpGained} XP</span>
                        <Trophy className="w-5 h-5 text-accent" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
