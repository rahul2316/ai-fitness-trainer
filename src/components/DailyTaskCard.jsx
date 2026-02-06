import { motion } from "framer-motion";
import { Check, Circle, Dumbbell, Utensils, Droplets, Moon } from "lucide-react";

export default function DailyTaskCard({ day, onTaskComplete, onViewWorkout, isToday = false }) {
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`card-premium p-6 md:p-8 rounded-[2rem] border ${isToday ? 'border-accent shadow-xl bg-card/60' : 'border-border bg-card/40'} relative overflow-hidden group h-full flex flex-col shadow-lg`}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Dumbbell className="w-32 h-32 text-accent" />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-black text-text uppercase italic tracking-tighter leading-none">
                            {dayOfWeek}
                        </h3>
                        {isToday && (
                            <span className="inline-block mt-2 px-3 py-1 bg-accent text-bg text-[0.6rem] font-black uppercase tracking-[0.3em] rounded-lg border border-accent shadow-sm">
                                ACTIVE_NOW
                            </span>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-text italic tracking-tighter leading-none">{completionPercentage}%</p>
                        <p className="font-mono text-[0.55rem] text-muted font-black uppercase tracking-[0.4em] leading-none mt-2 opacity-50">SYNC_STAT</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 bg-card/60 rounded-full overflow-hidden border border-border mt-6 shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        className="h-full bg-gradient-to-r from-accent to-emerald-400 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3 relative z-10">
                {/* Workout */}
                {!isRestDay && workout && (
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <button
                                onClick={() => onViewWorkout && onViewWorkout(workout)}
                                className="flex-1 p-3 bg-accent/10 hover:bg-accent/20 rounded-[1.5rem] border border-accent/20 transition-all flex items-center gap-4 group/btn text-left shadow-sm"
                            >
                                <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center text-bg shadow-xl shadow-accent/20 transition-transform group-hover/btn:scale-105">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-black text-text uppercase italic tracking-tighter group-hover:text-accent transition-colors leading-none line-clamp-1">
                                        {workout.name}
                                    </h3>
                                    <p className="text-[0.6rem] text-muted font-black uppercase tracking-[0.3em] mt-2 opacity-60">
                                        {workout.duration} • {workout.exercises?.length || 0} MODS
                                    </p>
                                </div>
                                <div className="px-4 py-2 bg-text text-bg rounded-xl text-[0.6rem] font-black uppercase tracking-widest italic shadow-lg">
                                    INIT
                                </div>
                            </button>
                        </div>

                        {/* Detailed Exercise List */}
                        {workout.exercises && workout.exercises.length > 0 && (
                            <div className="pl-4 space-y-2">
                                <p className="text-[0.6rem] text-muted font-black uppercase tracking-widest ml-1 mb-1.5 opacity-40">Exercises</p>
                                {workout.exercises.map((ex, exIdx) => (
                                    <div key={exIdx} className="flex items-center gap-2.5 group/ex">
                                        <button
                                            onClick={() => onTaskComplete(dayOfWeek, 'exercise', exIdx)}
                                            className={`flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${ex.completed
                                                ? 'bg-accent border-accent text-bg'
                                                : 'bg-card/60 border-border hover:border-accent/50 text-transparent shadow-inner'
                                                }`}
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <div className={`flex-1 p-3 bg-card/40 rounded-xl border border-border flex justify-between items-center shadow-sm ${ex.completed ? 'opacity-40' : ''}`}>
                                            <span className={`text-xs font-black text-text uppercase italic tracking-tight ${ex.completed ? 'line-through' : ''}`}>{ex.name}</span>
                                            <span className="font-black text-[0.65rem] text-accent/80 uppercase tracking-widest">{ex.sets}x{ex.reps}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {isRestDay && (
                    <div className="p-6 bg-card/60 rounded-2xl border border-border text-center shadow-inner">
                        <Moon className="w-8 h-8 text-blue-400 mx-auto mb-3 opacity-80" />
                        <p className="text-sm font-black text-text uppercase italic tracking-[0.2em] leading-none mb-2">RECOVERY ALPHA</p>
                        <p className="text-[0.65rem] text-muted font-black uppercase tracking-[0.3em] opacity-40">SYSTEMIC REPAIR ACTIVE</p>
                    </div>
                )}

                {/* Meals */}
                {meals.length > 0 && (
                    <div className="space-y-2 mt-4">
                        <p className="text-[0.6rem] text-muted font-black uppercase tracking-[0.4em] mb-3 opacity-40 px-1">NUTRITION LOG</p>
                        {meals.map((meal, idx) => (
                            <TaskItem
                                key={idx}
                                icon={<Utensils className="w-3.5 h-3.5" />}
                                title={meal.name}
                                label={meal.type ? meal.type.toUpperCase() : null}
                                subtitle={`${meal.calories} kcal • P:${meal.protein}g C:${meal.carbs}g F:${meal.fats}g`}
                                info={meal.food}
                                completed={meal.completed}
                                onToggle={() => onTaskComplete(dayOfWeek, 'meal', idx)}
                                accentColor="blue-400"
                                compact
                            />
                        ))}
                    </div>
                )}

                {/* Hydration & Sleep */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border mt-2">
                    <TaskItem
                        icon={<Droplets className="w-3.5 h-3.5" />}
                        title="Hydrate"
                        subtitle={`${hydration || 3000}ml`}
                        completed={hydrationCompleted}
                        onToggle={() => onTaskComplete(dayOfWeek, 'hydration')}
                        accentColor="cyan-400"
                        compact
                    />
                    <TaskItem
                        icon={<Moon className="w-3.5 h-3.5" />}
                        title="Sleep"
                        subtitle={`${sleepTarget || 8}hr`}
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

function TaskItem({ icon, title, subtitle, info, label, completed, onToggle, accentColor = "accent", compact = false }) {
    const colorClasses = {
        "accent": {
            bg: "bg-accent/10",
            border: "border-accent/20",
            text: "text-accent",
            label: "text-accent border-accent/20",
            circle: "group-hover/task:text-accent"
        },
        "blue-400": {
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
            text: "text-blue-400",
            label: "text-blue-400 border-blue-400/20",
            circle: "group-hover/task:text-blue-400"
        },
        "cyan-400": {
            bg: "bg-cyan-400/10",
            border: "border-cyan-400/20",
            text: "text-cyan-400",
            label: "text-cyan-400 border-cyan-400/20",
            circle: "group-hover/task:text-cyan-400"
        },
        "purple-400": {
            bg: "bg-purple-400/10",
            border: "border-purple-400/20",
            text: "text-purple-400",
            label: "text-purple-400 border-purple-400/20",
            circle: "group-hover/task:text-purple-400"
        }
    };

    const colors = colorClasses[accentColor] || colorClasses.accent;

    return (
        <button
            onClick={onToggle}
            className={`w-full ${compact ? 'p-3' : 'p-4'} bg-card/60 hover:bg-card/80 rounded-[1.25rem] border border-border transition-all flex items-center gap-4 group/task text-left shadow-sm active:scale-[0.98]`}
        >
            <div className={`flex-shrink-0 ${compact ? 'w-9 h-9' : 'w-11 h-11'} rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} transition-transform shadow-sm`}>
                {completed ? <Check className={compact ? 'w-4 h-4' : 'w-5 h-5'} /> : icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    {label && (
                        <span className={`text-[0.55rem] font-black ${colors.label} uppercase tracking-[0.2em] border px-2 py-0.5 rounded-lg shadow-sm`}>
                            {label}
                        </span>
                    )}
                    <p className={`${compact ? 'text-xs' : 'text-sm'} font-black text-text uppercase italic tracking-tighter truncate leading-none ${completed ? 'line-through opacity-40' : ''}`}>
                        {title}
                    </p>
                </div>
                {subtitle && (
                    <p className={`${compact ? 'text-[0.6rem]' : 'text-[0.65rem]'} text-muted font-black uppercase tracking-[0.1em] mt-2 truncate opacity-60`}>
                        {subtitle}
                    </p>
                )}
                {info && (
                    <p className={`${compact ? 'text-[0.6rem]' : 'text-[0.65rem]'} text-accent/80 font-black uppercase italic tracking-tight mt-1.5 line-clamp-1 opacity-80`}>
                        {info}
                    </p>
                )}
            </div>
            {!completed && (
                <Circle className={`w-4 h-4 text-muted/20 ${colors.circle} transition-colors flex-shrink-0`} />
            )}
        </button>
    );
}
