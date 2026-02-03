import DashboardLayout from "../layouts/DashboardLayout";
import MealCard from "../components/MealCard";
import AddFoodModal from "../components/AddFoodModal";
import { useState } from "react";
import { generateDietPlan } from "../services/ai";
import { useFitness } from "../context/FitnessContext";
import { Plus, Sparkles, Utensils, Target, Apple, Beef, Waves, Cookie, Activity, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useToast } from "../components/Toast";
import { motion } from "framer-motion";

export default function Diet() {
  const { dietPlan, updateDietPlan } = useFitness();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Preferences State
  const [dietType, setDietType] = useState("Balanced");
  const [targetCalories, setTargetCalories] = useState("2000");

  const meals = dietPlan || [];
  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  const handleGenerateValues = async () => {
    try {
      setLoading(true);
      const newPlan = await generateDietPlan({ dietType, calories: targetCalories });
      if (newPlan) {
        updateDietPlan(newPlan);
        addToast("DIET PLAN UPDATED", "success");
      } else {
        addToast("ERROR: Failed to generate diet", "error");
      }
    } catch (err) {
      addToast("CRITICAL ERROR: AI Assistant is offline", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto space-y-8 pb-20 relative overflow-x-hidden">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-accent transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          {/* Header Interface */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-16 bg-accent rounded-full"></div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Diet Center</h1>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">Manage your nutrition and daily meals</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 p-3 bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative group w-full xl:w-auto">
              <div className="absolute inset-0 bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="flex items-center gap-3 px-4 md:px-6 py-2 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all flex-grow md:flex-grow-0">
                <Apple className="w-4 h-4 text-accent flex-shrink-0" />
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                  className="bg-transparent text-[10px] font-black text-white outline-none uppercase tracking-widest cursor-pointer w-full"
                >
                  <option value="Balanced">Balanced Diet</option>
                  <option value="Keto">Keto</option>
                  <option value="Vegan">Vegan / Plant-Based</option>
                  <option value="High Protein">High Protein</option>
                </select>
              </div>

              <div className="flex items-center gap-3 px-4 md:px-6 py-2 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all flex-grow md:flex-grow-0">
                <Target className="w-4 h-4 text-accent flex-shrink-0" />
                <input
                  type="number"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(e.target.value)}
                  className="bg-transparent w-full md:w-16 text-[10px] font-black text-white outline-none tabular-nums"
                  placeholder="2000"
                />
                <span className="text-[8px] uppercase font-black text-muted tracking-widest whitespace-nowrap">KCAL/DAY</span>
              </div>

              <button
                onClick={handleGenerateValues}
                disabled={loading}
                className="bg-white text-black px-6 md:px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-accent transition-all flex items-center justify-center gap-3 disabled:opacity-20 flex-grow md:flex-grow-0 w-full md:w-auto"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generate Diet Plan
              </button>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="card-premium p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
              <Activity className="w-64 h-64 text-accent" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 md:gap-10 text-center sm:text-left">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-accent/10 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center border border-accent/20 shadow-2xl shadow-accent/5">
                <Utensils className="w-8 h-8 md:w-10 md:h-10 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.4em] mb-2 px-1">Current Daily Calories</p>
                <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 md:gap-3">
                  <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">{totalCalories}</h2>
                  <span className="text-sm md:text-xl font-black text-muted uppercase italic tracking-tighter">KCAL</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center relative z-10 w-full md:w-auto">
              <div className="flex gap-4 items-center">
                <div className="h-20 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <MacroMini icon={<Beef className="text-emerald-400" />} label="PRO" />
                  <MacroMini icon={<Waves className="text-blue-400" />} label="CHO" />
                  <MacroMini icon={<Cookie className="text-amber-500" />} label="FAT" />
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary px-8 md:px-12 py-4 md:py-5 text-black font-black uppercase tracking-tighter rounded-3xl flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 group hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                Add Meal
              </button>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
            {meals.length === 0 && !loading && (
              <div className="col-span-full py-40 text-center glass border-2 border-dashed border-white/5 rounded-[4rem]">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 opacity-20 border border-white/10">
                  <Utensils className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 opacity-40">No meals logged yet</h3>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.4em] max-w-sm mx-auto opacity-40">Generate a diet plan or log your meals manually to start tracking your nutrition.</p>
              </div>
            )}
          </div>

          {showModal && <AddFoodModal onClose={() => setShowModal(false)} />}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}

function MacroMini({ icon, label }) {
  return (
    <div className="text-center group-hover:scale-110 transition-transform">
      <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-2">
        {icon}
      </div>
      <p className="text-[8px] font-black text-muted tracking-widest">{label}</p>
    </div>
  );
}
