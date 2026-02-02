export const EXERCISE_DATABASE = [
    // CARDIO
    { id: 'running', name: 'Running', category: 'Cardio', unit: 'min', calPerUnit: 11.4, animKey: 'run' },
    { id: 'cycling', name: 'Cycling', category: 'Cardio', unit: 'min', calPerUnit: 7.5, animKey: 'default' },
    { id: 'swimming', name: 'Swimming', category: 'Cardio', unit: 'min', calPerUnit: 8.3, animKey: 'default' },
    { id: 'brisk_walk', name: 'Brisk Walk', category: 'Cardio', unit: 'min', calPerUnit: 4.5, animKey: 'run' },

    // STRENGTH (Push)
    { id: 'pushups', name: 'Pushups', category: 'Strength', unit: 'reps', calPerUnit: 0.5, animKey: 'push' },
    { id: 'bench_press', name: 'Bench Press', category: 'Strength', unit: 'reps', calPerUnit: 0.4, animKey: 'push' },
    { id: 'overhead_press', name: 'Overhead Press', category: 'Strength', unit: 'reps', calPerUnit: 0.4, animKey: 'push' },
    { id: 'dips', name: 'Dips', category: 'Strength', unit: 'reps', calPerUnit: 0.6, animKey: 'push' },

    // STRENGTH (Pull)
    { id: 'pullups', name: 'Pullups', category: 'Strength', unit: 'reps', calPerUnit: 1.0, animKey: 'pull' },
    { id: 'bicep_curls', name: 'Bicep Curls', category: 'Strength', unit: 'reps', calPerUnit: 0.3, animKey: 'pull' },
    { id: 'rows', name: 'Bent Over Rows', category: 'Strength', unit: 'reps', calPerUnit: 0.5, animKey: 'pull' },

    // STRENGTH (Legs)
    { id: 'squats', name: 'Squats', category: 'Strength', unit: 'reps', calPerUnit: 0.6, animKey: 'squat' },
    { id: 'lunges', name: 'Lunges', category: 'Strength', unit: 'reps', calPerUnit: 0.5, animKey: 'squat' },
    { id: 'deadlifts', name: 'Deadlifts', category: 'Strength', unit: 'reps', calPerUnit: 0.8, animKey: 'squat' },

    // HIIT / DYNAMIC
    { id: 'burpees', name: 'Burpees', category: 'HIIT', unit: 'reps', calPerUnit: 1.2, animKey: 'run' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', category: 'HIIT', unit: 'min', calPerUnit: 8.0, animKey: 'run' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', category: 'HIIT', unit: 'reps', calPerUnit: 0.4, animKey: 'run' },

    // FLEXIBILITY
    { id: 'plank', name: 'Plank', category: 'Flexibility', unit: 'min', calPerUnit: 3.5, animKey: 'default' },
    { id: 'yoga_flow', name: 'Yoga Flow', category: 'Flexibility', unit: 'min', calPerUnit: 4.0, animKey: 'default' },
    { id: 'stretching', name: 'Stretching', category: 'Flexibility', unit: 'min', calPerUnit: 2.5, animKey: 'default' }
];

export const CATEGORIES = ['All', 'Cardio', 'Strength', 'HIIT', 'Flexibility'];
