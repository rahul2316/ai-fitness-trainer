import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let model;

if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
} else {
    console.error("Missing VITE_GEMINI_API_KEY. AI features will not work.");
}

export async function getAIResponseStream(prompt, onChunk) {
    if (!model) {
        onChunk("AI is not configured. Please add your API Key.");
        return;
    }

    try {
        const result = await model.generateContentStream(prompt);

        let fullText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            onChunk(fullText);
        }

        return fullText;
    } catch (error) {
        console.error("Gemini Error:", error);
        const errorMessage = `I'm having trouble connecting to the AI. Error: ${error.message || "Unknown error"}`;
        onChunk(errorMessage);
        return errorMessage;
    }
}

export async function generateDietPlan(preferences = {}) {
    if (!model) return null;

    const { dietType = "balanced", calories = "2000" } = preferences;

    const prompt = `
        Generate a daily diet plan with 4 meals: Breakfast, Lunch, Dinner, Snacks.
        Criteria:
        - Diet Type: ${dietType}
        - Total Calories: ~${calories} kcal

        Return ONLY valid JSON in this format:
        [
            { "name": "Breakfast", "food": "Oatmeal with berries", "calories": 350 },
            { "name": "Lunch", "food": "Grilled chicken salad", "calories": 500 },
            { "name": "Dinner", "food": "Salmon with asparagus", "calories": 600 },
            { "name": "Snacks", "food": "Greek yogurt", "calories": 150 }
        ]
        Do not include markdown formatting like \`\`\`json.
    `;
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Clean up markdown code blocks if present
        const jsonText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("AI Diet Error:", error);
        return null; // Fallback handled in UI
    }
}

export async function generateWorkoutRoutine(preferences = {}) {
    if (!model) return null;

    const { type = "Full Body", duration = "45 mins" } = preferences;

    const prompt = `
        Generate a creative workout routine.
        Criteria:
        - Type: ${type}
        - Duration: ${duration}

        Return ONLY valid JSON in this format:
        {
            "id": ${Date.now()},
            "name": "HIIT Blast",
            "duration": "30 min",
            "exercises": [
              { "name": "Pushups", "sets": 3, "reps": "15" },
              { "name": "Squats", "sets": 3, "reps": "20" }
            ]
        }
        Do not include markdown formatting.
    `;
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("AI Workout Error:", error);
        return null;
    }
}
