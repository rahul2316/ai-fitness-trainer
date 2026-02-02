import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { FitnessProvider } from "./context/FitnessContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Diet from "./pages/Diet";
import AICoach from "./pages/AICoach";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import TrainingPlan from "./pages/TrainingPlan";

import { ToastProvider } from "./components/Toast";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<Plans />} />

        {/* Dashboard - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diet"
          element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-coach"
          element={
            <ProtectedRoute>
              <AICoach />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/training-plan"
          element={
            <ProtectedRoute>
              <TrainingPlan />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <FitnessProvider>
            <MainLayout>
              <AnimatedRoutes />
            </MainLayout>
          </FitnessProvider>
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
}



