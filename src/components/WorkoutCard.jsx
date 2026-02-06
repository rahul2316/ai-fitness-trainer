import { Timer, Layers, ChevronRight, Activity, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkoutCard({ workout, onView, onRemove }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card-premium p-6 md:p-8 rounded-[2rem] border border-border relative overflow-hidden group h-full flex flex-col bg-card/40 hover:border-accent/40 shadow-xl transition-all"
    >
      {/* Removal Button */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 flex items-center justify-center transition-all active:scale-95 group/remove"
        >
          <Plus className="w-4 h-4 rotate-45" />
        </button>
      )}
      <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
        <Activity className="w-28 h-28 text-accent" />
      </div>

      <div className="relative z-10 flex-grow">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-lg border border-accent/20 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          <p className="text-[0.6rem] font-black text-accent uppercase tracking-[0.3em]">NEURAL_PROTOCOL</p>
        </div>

        <h3 className="text-xl font-black text-text mb-4 uppercase italic tracking-tighter group-hover:text-accent transition-colors leading-none line-clamp-1">
          {workout.name}
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col gap-2 p-4 bg-card/60 rounded-2xl border border-border group-hover:border-accent/10 transition-all shadow-inner">
            <div className="flex items-center gap-2 text-[0.6rem] font-black text-muted uppercase tracking-[0.3em] mb-1 opacity-60">
              <Timer className="w-3.5 h-3.5 text-accent" />
              <span>TIME_DUR</span>
            </div>
            <p className="text-xl font-black text-text italic tracking-tighter leading-none">{workout.duration}</p>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-card/60 rounded-2xl border border-border group-hover:border-accent/10 transition-all shadow-inner">
            <div className="flex items-center gap-2 text-[0.6rem] font-black text-muted uppercase tracking-[0.3em] mb-1 opacity-60">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>COMP_MODS</span>
            </div>
            <p className="text-xl font-black text-text italic tracking-tighter leading-none">
              {Array.isArray(workout.exercises) ? workout.exercises.length : workout.exercises} EX
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onView(workout)}
        className="relative z-10 w-full bg-text text-bg font-black py-4 rounded-xl text-[0.65rem] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl group/btn hover:bg-accent hover:text-bg italic active:scale-95"
      >
        INITIATE_ANALYSIS
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </motion.div>
  );
}
