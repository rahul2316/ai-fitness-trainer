import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Mapping of exercise keywords to high-quality Lottie animation URLs
const LOTTIE_ASSETS = {
    push: "https://lottie.host/eec0e980-60b6-455a-b94f-442438841443/A8YToj9b70.json", // Pushup
    squat: "https://lottie.host/93310036-7c9d-4867-85ef-1a48c47cd675/k4M4zOltHk.json", // Squat
    run: "https://lottie.host/256b9c9f-3958-485a-83df-396593a2e38c/DqYq1i0Z2r.json", // Running
    pull: "https://lottie.host/682245b7-7e62-4416-8a03-9c8842af5646/O4o29Xz7N2.json", // Weightlifting/Bicep
    default: "https://lottie.host/5a7d6560-eb21-4384-9343-2396e95c4779/eB5QzO8CkB.json" // General Fitness
};

export default function ExerciseVisual({ exerciseName }) {
    const [animationData, setAnimationData] = useState(null);
    const [loadError, setLoadError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const name = exerciseName?.toLowerCase() || "";
        let url = LOTTIE_ASSETS.default;

        if (name.includes("push") || name.includes("press") || name.includes("dip")) {
            url = LOTTIE_ASSETS.push;
        } else if (name.includes("squat") || name.includes("lunge") || name.includes("leg")) {
            url = LOTTIE_ASSETS.squat;
        } else if (name.includes("run") || name.includes("jump") || name.includes("cardio")) {
            url = LOTTIE_ASSETS.run;
        } else if (name.includes("pull") || name.includes("curl") || name.includes("row") || name.includes("back")) {
            url = LOTTIE_ASSETS.pull;
        }

        setLoading(true);
        setLoadError(false);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAnimationData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lottie load error:", err);
                setLoadError(true);
                setLoading(false);
            });
    }, [exerciseName]);


    return (
        <div className="relative w-full aspect-square bg-bg rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center group shadow-2xl">
            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>

            {/* Background HUD Elements */}
            <div className="absolute inset-x-8 top-8 flex justify-between items-start opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="space-y-1">
                    <p className="text-[8px] font-black text-accent uppercase tracking-widest">Biometric Uplink</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-0.5 bg-accent rounded-full"
                            />
                        ))}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-muted uppercase tracking-widest">Neural Sync</p>
                    <div className="flex gap-1 justify-end">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full h-full p-12 flex items-center justify-center">
                {loading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                        <p className="text-[8px] font-black text-accent uppercase tracking-widest animate-pulse">Initializing Assets...</p>
                    </div>
                ) : !loadError && animationData ? (
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-full h-full"
                    />
                ) : (
                    <FallbackVisual exerciseName={exerciseName} />
                )}
            </div>


            {/* Footer Info */}
            <div className="absolute inset-x-8 bottom-8 flex justify-between items-end">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                    <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] mb-0.5">Focus Area</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">
                        {exerciseName || "General conditioning"}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-[8px] font-black text-muted uppercase tracking-widest mb-1">Status</p>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        Live Data
                    </span>
                </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent"></div>
        </div>
    );
}

// Re-using the stylized character as a fallback
function FallbackVisual({ exerciseName }) {
    const isLegs = /squat|lunge|leg/i.test(exerciseName);
    const isPush = /push|press|dip/i.test(exerciseName);
    const isPull = /pull|curl|row/i.test(exerciseName);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-32 h-48 flex flex-col items-center">
                {/* Head */}
                <motion.div
                    animate={isLegs ? { y: [0, 40, 0] } : isPush ? { y: [0, 20, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border-2 border-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] mb-2"
                ></motion.div>

                {/* Torso */}
                <motion.div
                    animate={isLegs ? { height: [60, 40, 60], y: [0, 20, 0] } : isPush ? { height: [60, 50, 60], y: [0, 10, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-24 bg-accent/40 rounded-full relative"
                >
                    {/* Arms */}
                    <motion.div
                        animate={isPush ? { rotateZ: [-45, 0, -45] } : isPull ? { rotateZ: [45, 90, 45] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 -left-8 w-16 h-1.5 bg-accent/60 rounded-full origin-right -rotate-[45deg]"
                    ></motion.div>
                    <motion.div
                        animate={isPush ? { rotateZ: [45, 0, 45] } : isPull ? { rotateZ: [-45, -90, -45] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-2 -right-8 w-16 h-1.5 bg-accent/60 rounded-full origin-left rotate-[45deg]"
                    ></motion.div>

                    {/* Legs */}
                    <motion.div
                        animate={isLegs ? { height: [40, 20, 40], y: [24, 10, 24] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-40px] -left-3 w-2.5 h-16 bg-accent/80 rounded-full"
                    ></motion.div>
                    <motion.div
                        animate={isLegs ? { height: [40, 20, 40], y: [24, 10, 24] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-40px] -right-3 w-2.5 h-16 bg-accent/80 rounded-full"
                    ></motion.div>
                </motion.div>
            </div>
        </div>
    );
}
