// services/gemini.ts
import { GoogleGenerativeAI } from "@google/genai";
import { schoolData, schoolName, a } from "../data/schoolData";
import { articles } from "../data/articles";
import { events } from "../data/events";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function runChat(prompt: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            temperature: 0.7,
            topP: 1,
            topK: 1,
            maxOutputTokens: 2048,
        },
        systemInstruction: `You are a friendly and helpful AI assistant for ${schoolName}, a premier nursery and primary school in Ado Ekiti, Nigeria. Your purpose is to answer questions from parents and prospective families.

            Use the following information about the school to answer questions:

            **School Information:**
            ${schoolData}

            **Recent Articles/News:**
            ${articles}

            **Upcoming Events:**
            ${events}

            Do not answer questions that are not related to ${schoolName}. Politely decline and steer the conversation back to the school.

            Keep your answers concise and friendly.

            If you do not know the answer to a question, say "I'm sorry, I don't have that information. Please contact the school directly at admissions@lanrystars.com."
            `,
    });

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        return `I'm sorry, I'm having a little trouble right now. Please try again later or contact the school directly if the problem persists. You can email us at admissions@lanrystars.com.`;
    }
}
