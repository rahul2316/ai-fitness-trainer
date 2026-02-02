import DashboardLayout from "../layouts/DashboardLayout";
import { useFitness } from "../context/FitnessContext";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Calendar, Target, Award, Dumbbell, Utensils, Activity as ActivityIcon, Zap, Trophy, TrendingUp, ChevronLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
    const { userProfile, calorieHistory, workoutRoutine, neuralXP } = useFitness();
    const { user } = useAuth();

    const totalMeals = calorieHistory?.length || 0;
    const joinedDate = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "Recently";

    const level = Math.floor((neuralXP || 0) / 1000) + 1;
    const progress = ((neuralXP || 0) % 1000) / 10;

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="max-w-6xl mx-auto space-y-10 pb-20 relative">
                    <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-accent transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>

                    {/* Hero / Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden card-premium p-12 rounded-[3.5rem] group"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000 pointer-events-none">
                            <User className="w-64 h-64 text-accent" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="relative">
                                <div className="w-40 h-40 bg-accent/10 rounded-full flex items-center justify-center border-2 border-accent/20 shadow-2xl shadow-accent/20 overflow-hidden">
                                    <User className="w-20 h-20 text-accent" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-accent text-black p-3 rounded-2xl shadow-xl shadow-accent/20 border border-white/20">
                                    <Trophy className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="text-center md:text-left space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Profile Active</p>
                                </div>
                                <h1 className="text-5xl font-extrabold text-white tracking-tight">
                                    {userProfile?.name || "Fitness User"}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                    <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest">
                                        <Mail className="w-4 h-4 text-accent" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
                                    <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        <span>Member since {joinedDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:ml-auto">
                                <Link
                                    to="/settings"
                                    className="btn btn-primary px-10 py-5 rounded-2xl shadow-2xl shadow-accent/10 group-hover:scale-105 transition-all text-sm"
                                >
                                    Edit Settings
                                </Link>
                            </div>
                        </div>

                        {/* XP Progress Bar Overlay in Hero */}
                        <div className="mt-12 pt-10 border-t border-white/5 relative z-10">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-1">Current Level</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter">LEVEL {level}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-1">Total Fitness Points</p>
                                    <p className="text-3xl font-black text-accent italic tracking-tighter">{neuralXP || 0} <span className="text-xs text-muted">XP</span></p>
                                </div>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full w-full overflow-hidden border border-white/5 p-0.5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-accent to-emerald-400 rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Strategy Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass p-10 rounded-[3rem] border border-white/5 hover:border-accent/30 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
                                    <Target className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-sm font-black text-muted uppercase tracking-[0.2em]">Fitness Goal</h3>
                            </div>
                            <p className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter leading-none">
                                {userProfile?.goal || "Conditioning"}
                            </p>
                            <p className="text-xs text-muted font-bold uppercase tracking-widest opacity-60">Your current training focus</p>
                        </motion.div>

                        {/* Performance Stats */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass p-10 rounded-[3rem] border border-white/5 hover:border-accent/30 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
                                    <Zap className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-sm font-black text-muted uppercase tracking-[0.2em]">Membership Tier</h3>
                            </div>
                            <p className="text-3xl font-black text-accent mb-3 uppercase italic tracking-tighter leading-none">
                                {userProfile?.subscriptionTier || "Standby"}
                            </p>
                            <p className="text-xs text-muted font-bold uppercase tracking-widest opacity-60">Your account level</p>
                        </motion.div>

                        {/* Activity Hub */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass p-10 rounded-[3rem] border border-white/5 hover:border-accent/30 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-all">
                                    <ActivityIcon className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-sm font-black text-muted uppercase tracking-[0.2em]">Weekly Activity</h3>
                            </div>
                            <div className="flex items-center gap-10">
                                <div>
                                    <p className="text-4xl font-black text-white tabular-nums italic tracking-tighter">{totalMeals}</p>
                                    <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-2 border-l-2 border-accent pl-2">Meals Logged</p>
                                </div>
                                <div className="h-10 w-[1px] bg-white/10"></div>
                                <div>
                                    <p className="text-4xl font-black text-white tabular-nums italic tracking-tighter">
                                        {workoutRoutine ? "1" : "0"}
                                    </p>
                                    <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-2 border-l-2 border-accent pl-2">Active Workouts</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Detailed Biometrics Table / Stats */}
                    <div className="card-premium p-12 rounded-[3.5rem] border border-white/5 space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <TrendingUp className="w-48 h-48 text-accent" />
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Account Details</h2>
                                <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em] mt-1">Your Personal Fitness Data</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[8px] font-black text-accent uppercase tracking-[0.5em]">Status: Active</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                            <BiometricItem
                                icon={<Utensils className="text-emerald-400" />}
                                label="Daily Calorie Goal"
                                value={`${userProfile?.targetCalories || 2000}`}
                                unit="KCAL"
                                color="emerald"
                            />
                            <BiometricItem
                                icon={<Dumbbell className="text-blue-400" />}
                                label="Workout Status"
                                value={workoutRoutine ? "ACTIVE" : "INACTIVE"}
                                unit=""
                                color="blue"
                            />
                            <BiometricItem
                                icon={<TrendingUp className="text-amber-500" />}
                                label="Progress Status"
                                value="TRACKING"
                                unit=""
                                color="amber"
                            />
                        </div>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}

function BiometricItem({ icon, label, value, unit, color }) {
    const colorMap = {
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        amber: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
        accent: 'bg-accent/10 border-accent/20 text-accent',
    };

    return (
        <div className="flex items-center gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group hover:border-accent/40 transition-all hover:bg-white/[0.08]">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center p-4 border transition-all group-hover:scale-110 ${colorMap[color] || colorMap.accent}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1.5">{label}</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-black text-white italic tracking-tighter uppercase">{value}</p>
                    {unit && <span className="text-[10px] text-muted font-black uppercase tracking-widest">{unit}</span>}
                </div>
            </div>
        </div>
    );
}
