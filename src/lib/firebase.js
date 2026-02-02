import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Debug environment variables in development
if (import.meta.env.DEV) {
    console.log('Firebase Environment Variables:', {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
    });
}

// Fallback configuration for production if env vars are not set
const fallbackConfig = {
    apiKey: "AIzaSyAZMcnJX7fzAeBN62imeQpvYjgfrKaOM6M",
    authDomain: "ai-fitness-trainer-37395.firebaseapp.com",
    projectId: "ai-fitness-trainer-37395",
    storageBucket: "ai-fitness-trainer-37395.firebasestorage.app",
    messagingSenderId: "895130725401",
    appId: "1:895130725401:web:78f7cd95f36ba120c28e88",
    measurementId: "G-422VXKM2N0"
};

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackConfig.appId,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.error('Firebase configuration is incomplete:', firebaseConfig);
    throw new Error('Firebase configuration is incomplete');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
