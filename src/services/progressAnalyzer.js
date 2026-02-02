/**
 * Progress Analyzer - Analyzes user fitness data and provides insights
 */

/**
 * Calculate workout consistency score (0-100)
 */
export function calculateConsistencyScore(workoutHistory, daysToAnalyze = 30) {
    if (!workoutHistory || workoutHistory.length === 0) return 0;

    const now = new Date();
    const cutoffDate = new Date(now.getTime() - daysToAnalyze * 24 * 60 * 60 * 1000);

    const recentWorkouts = workoutHistory.filter(w => {
        const workoutDate = new Date(w.timestamp);
        return workoutDate >= cutoffDate;
    });

    // Expected: 4-5 workouts per week
    const expectedWorkouts = Math.floor((daysToAnalyze / 7) * 4);
    const score = Math.min((recentWorkouts.length / expectedWorkouts) * 100, 100);

    return Math.round(score);
}

/**
 * Calculate calorie adherence (0-100)
 */
export function calculateCalorieAdherence(calorieHistory, targetCalories, daysToAnalyze = 7) {
    if (!calorieHistory || calorieHistory.length === 0) return 0;

    const recentDays = calorieHistory.slice(-daysToAnalyze);
    let totalAdherence = 0;

    recentDays.forEach(day => {
        const intake = day.intake || 0;
        const variance = Math.abs(intake - targetCalories);
        const dayAdherence = Math.max(0, 100 - (variance / targetCalories * 100));
        totalAdherence += dayAdherence;
    });

    return Math.round(totalAdherence / recentDays.length);
}

/**
 * Calculate weight trend (positive = gaining, negative = losing)
 */
export function calculateWeightTrend(weightHistory, weeks = 4) {
    if (!weightHistory || weightHistory.length < 2) return 0;

    const recentWeights = weightHistory.slice(-weeks);
    if (recentWeights.length < 2) return 0;

    const firstWeight = recentWeights[0].weight;
    const lastWeight = recentWeights[recentWeights.length - 1].weight;

    return parseFloat((lastWeight - firstWeight).toFixed(1));
}

/**
 * Calculate performance improvement (based on workout volume)
 */
export function calculatePerformanceImprovement(workoutHistory, weeks = 4) {
    if (!workoutHistory || workoutHistory.length < 2) return 0;

    const now = new Date();
    const cutoffDate = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);

    const recentWorkouts = workoutHistory.filter(w => {
        const workoutDate = new Date(w.timestamp);
        return workoutDate >= cutoffDate;
    });

    if (recentWorkouts.length < 2) return 0;

    // Calculate average volume (sets * reps * weight) for first half vs second half
    const midpoint = Math.floor(recentWorkouts.length / 2);
    const firstHalf = recentWorkouts.slice(0, midpoint);
    const secondHalf = recentWorkouts.slice(midpoint);

    const calculateVolume = (workouts) => {
        let totalVolume = 0;
        workouts.forEach(w => {
            if (w.exercises && Array.isArray(w.exercises)) {
                w.exercises.forEach(ex => {
                    const sets = ex.sets || 0;
                    const reps = parseInt(ex.reps) || 0;
                    const weight = ex.weight || 1;
                    totalVolume += sets * reps * weight;
                });
            }
        });
        return totalVolume / workouts.length;
    };

    const firstVolume = calculateVolume(firstHalf);
    const secondVolume = calculateVolume(secondHalf);

    if (firstVolume === 0) return 0;

    const improvement = ((secondVolume - firstVolume) / firstVolume) * 100;
    return Math.round(improvement);
}

/**
 * Get overall progress summary
 */
export function getProgressSummary(userData, trainingPlan) {
    const {
        workoutHistory = [],
        calorieHistory = [],
        weightHistory = [],
        userProfile = {}
    } = userData;

    const consistencyScore = calculateConsistencyScore(workoutHistory, 30);
    const calorieAdherence = calculateCalorieAdherence(
        calorieHistory,
        trainingPlan?.targetCalories || 2000,
        7
    );
    const weightTrend = calculateWeightTrend(weightHistory, 4);
    const performanceImprovement = calculatePerformanceImprovement(workoutHistory, 4);

    // Calculate overall score
    const overallScore = Math.round(
        (consistencyScore * 0.4) +
        (calorieAdherence * 0.3) +
        (Math.min(Math.abs(weightTrend) * 10, 100) * 0.15) +
        (Math.max(0, performanceImprovement) * 0.15)
    );

    return {
        overallScore: Math.min(overallScore, 100),
        consistencyScore,
        calorieAdherence,
        weightTrend,
        performanceImprovement,
        insights: generateInsights({
            consistencyScore,
            calorieAdherence,
            weightTrend,
            performanceImprovement,
            goal: userProfile.goal || trainingPlan?.goal
        })
    };
}

/**
 * Generate human-readable insights
 */
function generateInsights(metrics) {
    const insights = [];
    const { consistencyScore, calorieAdherence, weightTrend, performanceImprovement, goal } = metrics;

    // Consistency insights
    if (consistencyScore >= 80) {
        insights.push({
            type: "success",
            title: "Excellent Consistency",
            message: "You're crushing your workout schedule! Keep it up!"
        });
    } else if (consistencyScore >= 60) {
        insights.push({
            type: "warning",
            title: "Good Consistency",
            message: "You're doing well, but try to hit your workouts more regularly."
        });
    } else {
        insights.push({
            type: "alert",
            title: "Improve Consistency",
            message: "Try to stick to your workout schedule more consistently for better results."
        });
    }

    // Calorie adherence insights
    if (calorieAdherence >= 85) {
        insights.push({
            type: "success",
            title: "Perfect Nutrition",
            message: "Your calorie tracking is spot on! Great discipline!"
        });
    } else if (calorieAdherence < 70) {
        insights.push({
            type: "warning",
            title: "Nutrition Needs Attention",
            message: "Focus on hitting your calorie targets more consistently."
        });
    }

    // Weight trend insights
    if (goal === "weight_loss" && weightTrend < -0.5) {
        insights.push({
            type: "success",
            title: "Weight Loss Progress",
            message: `You've lost ${Math.abs(weightTrend)}kg! Excellent progress!`
        });
    } else if (goal === "muscle_gain" && weightTrend > 0.5) {
        insights.push({
            type: "success",
            title: "Muscle Gain Progress",
            message: `You've gained ${weightTrend}kg! Keep building!`
        });
    }

    // Performance insights
    if (performanceImprovement > 10) {
        insights.push({
            type: "success",
            title: "Strength Gains",
            message: `Your workout volume increased by ${performanceImprovement}%! You're getting stronger!`
        });
    }

    return insights;
}

/**
 * Calculate daily task completion rate
 */
export function calculateDailyCompletion(dailyTasks) {
    if (!dailyTasks) return 0;

    let completed = 0;
    let total = 0;

    if (dailyTasks.workout) {
        total++;
        if (dailyTasks.workoutCompleted) completed++;
    }

    if (dailyTasks.meals && Array.isArray(dailyTasks.meals)) {
        total += dailyTasks.meals.length;
        completed += dailyTasks.meals.filter(m => m.completed).length;
    }

    if (dailyTasks.hydration) {
        total++;
        if (dailyTasks.hydrationCompleted) completed++;
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/**
 * Calculate weekly completion rate
 */
export function calculateWeeklyCompletion(weekData) {
    if (!weekData || !weekData.days) return 0;

    let totalTasks = 0;
    let completedTasks = 0;

    weekData.days.forEach(day => {
        if (day.type === "workout" && day.workout) {
            totalTasks++;
            if (day.workoutCompleted) completedTasks++;
        }

        if (day.meals) {
            totalTasks += day.meals.length;
            completedTasks += day.meals.filter(m => m.completed).length;
        }
    });

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
}
