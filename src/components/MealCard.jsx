import { Plus, Utensils, Check, Beef, Waves, Cookie, Activity, Info } from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "./Toast";
import FOOD_DATABASE from "../data/foodItems.json";

export default function MealCard({ meal, onViewDetails, onRemove }) {
  const { addMealEntry } = useFitness();
  const { addToast } = useToast();
  const [logged, setLogged] = useState(false);

  const handleLog = async () => {
    try {
      await addMealEntry(meal);
      setLogged(true);
      addToast("METABOLIC LOG AUTHORIZED", "success");
      setTimeout(() => setLogged(false), 2000);
    } catch (err) {
      addToast("LOGGING FAILED", "error");
    }
  };

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
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20 transition-all shadow-sm">
              <Utensils className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="text-base font-black text-text uppercase italic tracking-tighter leading-none line-clamp-1">{meal.name}</h3>
              <p className="text-[0.6rem] text-accent font-black uppercase tracking-[0.4em] mt-2 opacity-80">{meal.type || "FUEL"}</p>
            </div>
          </div>
          <button
            onClick={() => {
              const fullFood = FOOD_DATABASE.find(f => f.name === meal.name);
              onViewDetails(fullFood || meal);
            }}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5"
          >
            <Info className="w-4 h-4 text-muted" />
          </button>
        </div>

        <div className="bg-card/60 rounded-2xl p-5 border border-border mb-6 flex justify-between items-center group-hover:border-accent/30 transition-all shadow-inner">
          <p className="text-[0.6rem] font-black text-muted uppercase tracking-[0.4em] opacity-60">ENERGY_SYNC</p>
          <div className="text-right">
            <span className="text-3xl font-black text-text italic tracking-tighter tabular-nums block leading-none">
              {meal.calories}
            </span>
            <span className="text-[0.6rem] font-black text-accent uppercase mt-2 block opacity-80 tracking-widest">KCAL</span>
          </div>
        </div>

        {/* Macros Display */}
        {(meal.protein || meal.protein_g || meal.carbs || meal.carbs_g || meal.fats || meal.fats_g) && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <MacroStat icon={<Beef className="w-3.5 h-3.5 text-emerald-400" />} label="PRO" val={meal.protein || meal.protein_g} />
            <MacroStat icon={<Waves className="w-3.5 h-3.5 text-blue-400" />} label="CHO" val={meal.carbs || meal.carbs_g} />
            <MacroStat icon={<Cookie className="w-3.5 h-3.5 text-amber-500" />} label="FAT" val={meal.fats || meal.fats_g} />
          </div>
        )}
      </div>

      <button
        onClick={handleLog}
        disabled={logged}
        className={`relative z-10 w-full py-4 rounded-xl text-[0.65rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl group/btn italic
          ${logged ? 'bg-accent text-bg shadow-accent/20' : 'bg-text text-bg hover:bg-accent transition-all active:scale-95'}`}
      >
        {logged ? (
          <>
            <Check className="w-4 h-4" />
            SYCHRONIZED
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
            COMMIT_DATA
          </>
        )}
      </button>
    </motion.div>
  );
}

function MacroStat({ icon, label, val }) {
  return (
    <div className="bg-card/60 rounded-2xl p-4 border border-border flex flex-col items-center gap-3 group-hover:border-accent/30 transition-all shadow-sm">
      <div className="p-2 bg-accent/5 rounded-xl border border-accent/10">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-[0.55rem] font-black text-muted uppercase tracking-[0.3em] mb-1.5 opacity-60 text-center">{label}</p>
        <p className="text-sm font-black text-text tabular-nums text-center italic tracking-tighter leading-none">{val || 0}G</p>
      </div>
    </div>
  );
}
