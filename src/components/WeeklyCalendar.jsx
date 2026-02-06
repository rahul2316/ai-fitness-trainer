import { motion } from "framer-motion";
import { Check, Circle, Dumbbell, Moon } from "lucide-react";

export default function WeeklyCalendar({ weekData, onDayClick, currentDay }) {
    if (!weekData || !weekData.days) return null;

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {daysOfWeek.map((dayName, index) => {
                const dayData = weekData.days.find(d => d.dayOfWeek === dayName) || {};
                const isToday = currentDay === dayName;
                const isRestDay = dayData.type === "rest";
                const isCompleted = dayData.workoutCompleted && dayData.meals?.every(m => m.completed);

                // Calculate completion percentage
                const totalTasks = isRestDay ? 2 : (1 + (dayData.meals?.length || 0) + 2);
                const completedTasks = [
                    dayData.workoutCompleted,
                    ...(dayData.meals?.map(m => m.completed) || []),
                    dayData.hydrationCompleted,
                    dayData.sleepCompleted
                ].filter(Boolean).length;
                const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

                return (
                    <motion.button
                        key={dayName}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onDayClick(dayData)}
                        className={`p-6 rounded-[1.5rem] border transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg active:scale-95 ${isToday
                            ? 'bg-accent border-accent text-bg shadow-accent/20'
                            : isCompleted
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-card/40 border-border hover:border-accent/40'
                            }`}
                    >
                        {/* Background icon */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            {isRestDay ? (
                                <Moon className="w-16 h-16 text-blue-400" />
                            ) : (
                                <Dumbbell className="w-16 h-16 text-accent" />
                            )}
                        </div>

                        <div className="relative z-10 text-left">
                            {/* Day name */}
                            {/* Day name */}
                            <div className="flex flex-col items-center gap-2 mb-4">
                                <h4 className={`text-[0.65rem] font-black uppercase italic tracking-[0.3em] ${isToday ? 'text-bg' : 'text-text opacity-70'}`}>
                                    {dayName.substring(0, 3)}
                                </h4>
                                {isCompleted && (
                                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                                        <Check className="w-4 h-4 text-bg" />
                                    </div>
                                )}
                                {!isCompleted && !isToday && (
                                    <Circle className="w-6 h-6 text-muted/30" />
                                )}
                                {isToday && !isCompleted && (
                                    <div className="w-2.5 h-2.5 bg-bg rounded-full animate-pulse" />
                                )}
                            </div>

                            {/* Workout name or rest */}
                            {/* Workout name or rest */}
                            {isRestDay ? (
                                <p className={`text-[0.55rem] font-black uppercase tracking-[0.2em] mb-2 ${isToday ? 'text-bg/80' : 'text-blue-400/80'}`}>
                                    REST
                                </p>
                            ) : (
                                <p className={`text-[0.6rem] font-black uppercase tracking-widest mb-2 line-clamp-1 italic ${isToday ? 'text-bg' : 'text-text'}`}>
                                    {dayData.workout?.name?.split(' ')[0] || "READY"}
                                </p>
                            )}

                            {/* Progress bar */}
                            <div className={`h-1 rounded-full overflow-hidden mb-2 ${isToday ? 'bg-bg/20' : 'bg-card/60'}`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${completionPercentage}%` }}
                                    className={`h-full ${isToday
                                        ? 'bg-bg'
                                        : isCompleted
                                            ? 'bg-emerald-500'
                                            : 'bg-accent'
                                        }`}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                />
                            </div>

                            {/* Completion percentage */}
                            <p className={`text-[0.55rem] font-black uppercase tracking-[0.2em] ${isToday ? 'text-bg/60' : 'text-muted/60'}`}>
                                {completionPercentage}%
                            </p>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
