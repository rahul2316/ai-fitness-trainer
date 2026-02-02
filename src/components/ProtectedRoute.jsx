import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFitness } from "../context/FitnessContext";
import { Bot, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children }) {
    const { user, loading: authLoading } = useAuth();
    const { userProfile, loadingData: fitnessLoading } = useFitness();
    const location = useLocation();

    if (authLoading || fitnessLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

                <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-white/5 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Bot className="w-8 h-8 text-accent animate-pulse" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Neural Link Initialization</h2>
                    <div className="flex items-center gap-2 justify-center">
                        <Activity className="w-3 h-3 text-accent animate-pulse" />
                        <p className="text-[10px] text-muted font-black uppercase tracking-[0.4em]">Synchronizing Biometric Data...</p>
                    </div>
                </div>

                <div className="absolute bottom-12 text-[8px] font-black text-white/10 uppercase tracking-[1em]">Secure Multi-Protocol Relay</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!userProfile?.subscriptionTier && location.pathname !== "/plans") {
        return <Navigate to="/plans" replace />;
    }

    return children;
}
