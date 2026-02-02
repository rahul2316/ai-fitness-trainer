import { X, Search, Plus, Trash2, Calculator, Timer, Flame, ChevronRight, Activity, Save, Layers } from "lucide-react";
import { useState, useMemo } from "react";
import { useFitness } from "../context/FitnessContext";
import { EXERCISE_DATABASE, CATEGORIES } from "../data/exercises";
import ExerciseVisual from "./ExerciseVisual";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./Toast";

export default function AddWorkoutModal({ onClose }) {
  const { updateWorkoutRoutine } = useFitness();
  const { addToast } = useToast();
  const [protocolName, setProtocolName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtered exercise list
  const filteredExercises = useMemo(() => {
    return EXERCISE_DATABASE.filter(ex => {
      const matchesCategory = selectedCategory === "All" || ex.category === selectedCategory;
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCalories = selectedExercises.reduce((acc, ex) => {
    return acc + (ex.value * ex.calPerUnit);
  }, 0);

  const totalDuration = selectedExercises.reduce((acc, ex) => {
    return acc + (ex.unit === 'min' ? parseInt(ex.value) : (parseInt(ex.value) * 3) / 60);
  }, 0);

  const addExercise = (exercise) => {
    if (selectedExercises.find(e => e.id === exercise.id)) return;
    setSelectedExercises([...selectedExercises, { ...exercise, value: 10 }]);
  };

  const removeExercise = (id) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== id));
  };

  const updateValue = (id, newVal) => {
    setSelectedExercises(selectedExercises.map(e =>
      e.id === id ? { ...e, value: Math.max(1, parseInt(newVal) || 0) } : e
    ));
  };

  const handleSave = async () => {
    if (!protocolName || selectedExercises.length === 0) return;
    try {
      setLoading(true);
      const workoutData = {
        id: Date.now(),
        name: protocolName,
        duration: `${Math.round(totalDuration)} min`,
        totalCalories: Math.round(totalCalories),
        exercises: selectedExercises.map(ex => ({
          name: ex.name,
          sets: 1,
          reps: ex.unit === 'reps' ? String(ex.value) : "1",
          duration: ex.unit === 'min' ? `${ex.value} min` : "N/A"
        }))
      };
      await updateWorkoutRoutine(workoutData);
      addToast("WORKOUT PLAN SAVED", "success");
      onClose();
    } catch (err) {
      addToast("FAILED TO SAVE WORKOUT", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-bg/95 backdrop-blur-2xl flex items-center justify-center z-[200] p-6 lg:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-card/90 border border-white/5 w-full max-w-7xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col xl:flex-row h-[95vh] md:h-[90vh]"
      >
        {/* Left Panel: Exercise Browser */}
        <div className="w-full xl:w-[450px] border-b xl:border-b-0 xl:border-r border-white/5 p-6 md:p-10 flex flex-col bg-black/40 relative overflow-hidden h-1/2 xl:h-full">
          <div className="absolute top-0 left-0 p-10 opacity-5 -translate-x-12 -translate-y-12 pointer-events-none">
            <Layers className="w-64 h-64 text-accent" />
          </div>

          <div className="mb-10 relative z-10">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2 leading-none">Exercise Library</h2>
            <div className="flex items-center gap-2 text-accent text-[8px] font-black uppercase tracking-[0.3em]">
              <div className="w-2 h-0.5 bg-accent"></div>
              Add Exercises to Your Plan
            </div>
          </div>

          {/* Search & Filter */}
          <div className="space-y-6 mb-8 relative z-10">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for an exercise..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-accent/40 text-sm font-black uppercase tracking-tight transition-all placeholder:opacity-30"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${selectedCategory === cat
                    ? 'bg-white text-black border-white shadow-lg shadow-white/5'
                    : 'bg-white/5 text-muted border-white/5 hover:border-white/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-grow overflow-y-auto scrollbar-none space-y-3 relative z-10">
            {filteredExercises.map(ex => (
              <button
                key={ex.id}
                onClick={() => addExercise(ex)}
                disabled={selectedExercises.some(e => e.id === ex.id)}
                className="w-full flex items-center justify-between p-5 bg-white/5 rounded-[2rem] border border-white/5 hover:border-accent/30 hover:bg-white/[0.08] transition-all group disabled:opacity-20"
              >
                <div className="text-left">
                  <p className="font-black text-white text-sm uppercase italic tracking-tighter">{ex.name}</p>
                  <p className="text-[8px] font-black text-muted uppercase tracking-[0.3em] mt-1">{ex.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[8px] font-black text-accent uppercase tracking-widest">{ex.calPerUnit} KCAL/{ex.unit}</span>
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-accent group-hover:text-black transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Configuration */}
        <div className="flex-1 p-6 md:p-12 flex flex-col relative overflow-hidden h-1/2 xl:h-full">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none -translate-y-12 translate-x-12">
            <Activity className="w-[500px] h-[500px] text-accent" />
          </div>

          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="space-y-4 flex-grow max-w-lg">
              <label className="text-[9px] font-black text-muted uppercase tracking-[0.4em] flex items-center gap-2 px-2">
                <div className="w-1 h-3 bg-accent rounded-full"></div>
                Workout Plan Name
              </label>
              <input
                value={protocolName}
                onChange={(e) => setProtocolName(e.target.value)}
                placeholder="ENTER WORKOUT NAME"
                className="bg-transparent border-b-2 border-white/10 focus:border-accent text-5xl font-black text-white uppercase tracking-tighter outline-none w-full pb-4 transition-all italic"
              />
            </div>
            <button
              onClick={onClose}
              className="p-4 bg-white/5 text-muted hover:text-white transition-all rounded-3xl border border-white/5 hover:border-white/10"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Configuration List */}
          <div className="flex-grow overflow-y-auto pr-4 scrollbar-none space-y-6 mb-12 relative z-10 mask-gradient-b">
            <AnimatePresence>
              {selectedExercises.map(ex => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  key={ex.id}
                  className="card-premium border border-white/5 rounded-[3rem] p-8 flex flex-col lg:flex-row items-center gap-10 group"
                >
                  <div className="w-32 h-32 rounded-[2rem] overflow-hidden flex-shrink-0 border border-white/5 shadow-2xl relative">
                    <ExerciseVisual exerciseName={ex.name} />
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-all"></div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-black text-white text-2xl uppercase italic tracking-tighter group-hover:text-accent transition-colors leading-none">{ex.name}</h4>
                        <p className="text-[9px] text-accent font-black uppercase tracking-[0.3em] mt-2">Exercise Added</p>
                      </div>
                      <button
                        onClick={() => removeExercise(ex.id)}
                        className="p-4 bg-white/5 hover:bg-red-500 hover:text-white rounded-2xl transition-all text-muted shadow-xl shadow-transparent hover:shadow-red-500/20"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="w-40">
                        <p className="text-[8px] font-black text-muted uppercase tracking-widest mb-3 px-1">Intensity ({ex.unit})</p>
                        <input
                          type="number"
                          value={ex.value}
                          onChange={(e) => updateValue(ex.id, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-accent/40 outline-none text-white font-black text-2xl tabular-nums transition-all italic tracking-tighter"
                        />
                      </div>
                      <div className="flex-grow pt-6">
                        <input
                          type="range"
                          min="1"
                          max={ex.unit === 'min' ? "60" : "100"}
                          value={ex.value}
                          onChange={(e) => updateValue(ex.id, e.target.value)}
                          className="w-full h-2 bg-white/10 rounded-full appearance-none accent-accent cursor-pointer hover:bg-accent/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {selectedExercises.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-10 border-4 border-dashed border-white/5 rounded-[4rem] py-40">
                <Calculator className="w-24 h-24 mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-[0.2em] italic">No Exercises Selected</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4">Select exercises from the list on the left to build your workout.</p>
              </div>
            )}
          </div>

          {/* Footer Stats & Action */}
          <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10 bg-transparent">
            <div className="flex gap-16">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-widest">
                  <Timer className="w-4 h-4" />
                  Total Time
                </div>
                <p className="text-4xl font-black text-white italic tracking-tighter">{Math.round(totalDuration)}<span className="text-xs text-muted ml-2">MIN</span></p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-black text-orange-500 uppercase tracking-widest">
                  <Flame className="w-4 h-4" />
                  Calories Burned
                </div>
                <p className="text-4xl font-black text-white italic tracking-tighter">{Math.round(totalCalories)}<span className="text-xs text-muted ml-2">KCAL</span></p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading || !protocolName || selectedExercises.length === 0}
              className="w-full lg:w-auto min-w-[350px] bg-white text-black py-7 px-12 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-accent transition-all disabled:opacity-20 flex items-center justify-center gap-4 text-sm shadow-2xl shadow-white/5 group active:scale-95"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  SAVE WORKOUT PLAN
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
