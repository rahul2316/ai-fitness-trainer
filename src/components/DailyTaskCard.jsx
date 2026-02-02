import { motion } from "framer-motion";
import { Check, Circle, Dumbbell, Utensils, Droplets, Moon } from "lucide-react";

export default function DailyTaskCard({ day, onTaskComplete, isToday = false }) {
    if (!day) return null;

    const { dayOfWeek, type, workout, meals = [], hydration, sleepTarget, workoutCompleted, hydrationCompleted, sleepCompleted } = day;

    const isRestDay = type === "rest";

    // Calculate completion percentage
    const totalTasks = isRestDay ? 2 : (1 + meals.length + 2); // workout + meals + hydration + sleep
    const completedTasks = [
        workoutCompleted,
        ...meals.map(m => m.completed),
        hydrationCompleted,
        sleepCompleted
    ].filter(Boolean).length;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card-premium p-8 rounded-[2.5rem] border ${isToday ? 'border-accent/40 shadow-accent/10' : 'border-white/5'
                } relative overflow-hidden group`}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Dumbbell className="w-32 h-32 text-accent" />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                            {dayOfWeek}
                        </h3>
                        {isToday && (
                            <span className="inline-block mt-1 px-3 py-1 bg-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded-full border border-accent/30">
                                Today
                            </span>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-white italic tracking-tighter">{completionPercentage}%</p>
                        <p className="text-[8px] text-muted font-black uppercase tracking-widest">Complete</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        className="h-full bg-gradient-to-r from-accent to-emerald-400"
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4 relative z-10">
                {/* Workout */}
                {!isRestDay && workout && (
                    <TaskItem
                        icon={<Dumbbell className="w-5 h-5" />}
                        title={workout.name}
                        subtitle={`${workout.exercises?.length || 0} exercises • ${workout.duration}`}
                        completed={workoutCompleted}
                        onToggle={() => onTaskComplete(dayOfWeek, 'workout')}
                        accentColor="accent"
                    />
                )}

                {isRestDay && (
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <Moon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm font-black text-white uppercase italic tracking-tight">Rest & Recovery Day</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-tight mt-1">
                            Focus on stretching, hydration, and sleep
                        </p>
                    </div>
                )}

                {/* Meals */}
                {meals.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-3">Nutrition</p>
                        {meals.map((meal, idx) => (
                            <TaskItem
                                key={idx}
                                icon={<Utensils className="w-4 h-4" />}
                                title={meal.name}
                                subtitle={`${meal.calories} kcal • P:${meal.protein}g C:${meal.carbs}g F:${meal.fats}g`}
                                completed={meal.completed}
                                onToggle={() => onTaskComplete(dayOfWeek, 'meal', idx)}
                                accentColor="blue-400"
                                compact
                            />
                        ))}
                    </div>
                )}

                {/* Hydration & Sleep */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    <TaskItem
                        icon={<Droplets className="w-4 h-4" />}
                        title="Hydration"
                        subtitle={`${hydration || 3000}ml`}
                        completed={hydrationCompleted}
                        onToggle={() => onTaskComplete(dayOfWeek, 'hydration')}
                        accentColor="cyan-400"
                        compact
                    />
                    <TaskItem
                        icon={<Moon className="w-4 h-4" />}
                        title="Sleep"
                        subtitle={`${sleepTarget || 8}hrs`}
                        completed={sleepCompleted}
                        onToggle={() => onTaskComplete(dayOfWeek, 'sleep')}
                        accentColor="purple-400"
                        compact
                    />
                </div>
            </div>
        </motion.div>
    );
}

function TaskItem({ icon, title, subtitle, completed, onToggle, accentColor = "accent", compact = false }) {
    return (
        <button
            onClick={onToggle}
            className={`w-full ${compact ? 'p-3' : 'p-4'} bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-${accentColor}/30 transition-all flex items-center gap-3 group/task text-left`}
        >
            <div className={`flex-shrink-0 w-${compact ? '8' : '10'} h-${compact ? '8' : '10'} rounded-xl bg-${accentColor}/10 border border-${accentColor}/20 flex items-center justify-center text-${accentColor} group-hover/task:scale-110 transition-transform`}>
                {completed ? <Check className={`w-${compact ? '4' : '5'} h-${compact ? '4' : '5'}`} /> : icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`${compact ? 'text-xs' : 'text-sm'} font-black text-white uppercase italic tracking-tight truncate ${completed ? 'line-through opacity-50' : ''}`}>
                    {title}
                </p>
                <p className={`text-[${compact ? '8' : '9'}px] text-muted font-bold uppercase tracking-tight truncate`}>
                    {subtitle}
                </p>
            </div>
            {!completed && (
                <Circle className={`w-5 h-5 text-muted group-hover/task:text-${accentColor} transition-colors`} />
            )}
        </button>
    );
}
