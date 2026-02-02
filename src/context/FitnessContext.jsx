import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

const FitnessContext = createContext();

export function useFitness() {
    return useContext(FitnessContext);
}

export function FitnessProvider({ children }) {
    const { user } = useAuth();

    // State
    const [userProfile, setUserProfile] = useState(null);
    const [dietPlan, setDietPlan] = useState([]);
    const [workoutRoutine, setWorkoutRoutine] = useState(null);
    const [weightHistory, setWeightHistory] = useState([]);
    const [calorieHistory, setCalorieHistory] = useState([]);
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [neuralXP, setNeuralXP] = useState(0);
    const [streak, setStreak] = useState(0);
    const [hydration, setHydration] = useState(0);
    const [loadingData, setLoadingData] = useState(true);

    // Initial Defaults (if new user)
    const defaultProfile = {
        name: "New User",
        goal: "Get Fit",
        targetCalories: 2000,
        subscriptionTier: "free",
        neuralXP: 0,
        streak: 0,
        hydration: 0
    };


    useEffect(() => {
        if (!user) {
            setUserProfile(null);
            setDietPlan([]);
            setWorkoutRoutine(null);
            setWeightHistory([]);
            setCalorieHistory([]);
            setLoadingData(false);
            return;
        }

        setLoadingData(true);
        const userRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserProfile(data.profile || defaultProfile);
                setDietPlan(data.dietPlan || []);
                setWorkoutRoutine(data.workoutRoutine || null);
                setWeightHistory(data.weightHistory || []);
                setCalorieHistory(data.calorieHistory || []);
                setWorkoutHistory(data.workoutHistory || []);
                setNeuralXP(data.profile?.neuralXP || 0);
                setStreak(data.profile?.streak || 0);
                setHydration(data.profile?.hydration || 0);
            } else {
                setDoc(userRef, {
                    profile: { ...defaultProfile, name: user.email?.split("@")[0] || "User" },
                    dietPlan: [],
                    workoutRoutine: null,
                    weightHistory: [],
                    calorieHistory: [],
                    workoutHistory: [],
                    createdAt: new Date().toISOString()
                }, { merge: true });
            }

            setLoadingData(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setLoadingData(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Actions
    const updateUserProfile = async (newProfile) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { profile: { ...userProfile, ...newProfile } }, { merge: true });
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    const updateDietPlan = async (newPlan) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { dietPlan: newPlan }, { merge: true });
        } catch (err) {
            console.error("Error updating diet:", err);
        }
    };

    const updateWorkoutRoutine = async (newRoutine) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { workoutRoutine: newRoutine }, { merge: true });
        } catch (err) {
            console.error("Error updating workout:", err);
        }
    };

    const addMealEntry = async (meal) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            const today = new Date().toLocaleDateString();

            const history = [...calorieHistory];
            const todayIndex = history.findIndex(h => h.date === today);

            const protein = parseFloat(meal.protein || 0);
            const carbs = parseFloat(meal.carbs || 0);
            const fats = parseFloat(meal.fats || 0);
            const cals = parseFloat(meal.calories || 0);

            if (todayIndex > -1) {
                history[todayIndex].intake += cals;
                history[todayIndex].protein = (history[todayIndex].protein || 0) + protein;
                history[todayIndex].carbs = (history[todayIndex].carbs || 0) + carbs;
                history[todayIndex].fats = (history[todayIndex].fats || 0) + fats;
            } else {
                history.push({
                    date: today,
                    intake: cals,
                    burned: 0,
                    protein,
                    carbs,
                    fats
                });
            }

            await updateDoc(userRef, { calorieHistory: history });
        } catch (err) {
            console.error("Error logging meal:", err);
        }
    };


    const addWeightEntry = async (weight) => {
        if (!user) return;
        try {
            const newEntry = { date: new Date().toLocaleDateString(), weight: parseFloat(weight) };
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { weightHistory: arrayUnion(newEntry) });
        } catch (err) {
            console.error("Error adding weight:", err);
        }
    };

    const completeWorkout = async (workout) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            const today = new Date().toLocaleDateString();

            // Calculate calorie burn from workout data or default
            const burnedCalories = workout.totalCalories || 400;
            const xpReward = 50;

            const completionEntry = {
                date: today,
                timestamp: new Date().toISOString(),
                workoutId: workout.id,
                name: workout.name,
                duration: workout.duration,
                calories: burnedCalories,
                xpAwarded: xpReward
            };

            const history = [...calorieHistory];
            const todayIndex = history.findIndex(h => h.date === today);

            if (todayIndex > -1) {
                history[todayIndex].burned = (history[todayIndex].burned || 0) + burnedCalories;
            } else {
                history.push({ date: today, intake: 0, burned: burnedCalories });
            }

            // Gamification Update
            const newXP = (userProfile?.neuralXP || 0) + xpReward;
            const newStreak = (userProfile?.streak || 0) + 1;

            await updateDoc(userRef, {
                workoutHistory: arrayUnion(completionEntry),
                calorieHistory: history,
                "profile.neuralXP": newXP,
                "profile.streak": newStreak
            });
        } catch (err) {
            console.error("Error completing workout:", err);
        }
    };

    const updateHydration = async (amount) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            const newHydration = Math.max(0, (userProfile?.hydration || 0) + amount);
            await updateDoc(userRef, { "profile.hydration": newHydration });
        } catch (err) {
            console.error("Error updating hydration:", err);
        }
    };



    const resetData = async () => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                dietPlan: [],
                workoutRoutine: null,
                weightHistory: [],
                calorieHistory: [],
                workoutHistory: []
            }, { merge: true });
        } catch (err) {
            console.error("Error resetting data:", err);
        }
    };

    const value = {
        userProfile,
        dietPlan,
        workoutRoutine,
        weightHistory,
        calorieHistory,
        workoutHistory,
        neuralXP,
        streak,
        hydration,
        loadingData,
        updateUserProfile,
        updateDietPlan,
        updateWorkoutRoutine,
        addMealEntry,
        addWeightEntry,
        completeWorkout,
        updateHydration,
        resetData
    };


    return (
        <FitnessContext.Provider value={value}>
            {children}
        </FitnessContext.Provider>
    );
}

