import { GoogleGenAI, Chat } from "@google/genai";
import { schoolData } from '../data/schoolData';

let chat: Chat;

try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are a friendly and helpful AI assistant for Young Stars International School, a premier nursery and primary school in Ado Ekiti, Nigeria. Your purpose is to answer questions from parents and prospective families.

            Use the following information about the school to answer questions accurately. Be concise and helpful. If you don't know the answer, say that you don't have that information and suggest they contact the school directly at info@youngstars.ng or +234 806 373 1163.

            Do not answer questions that are not related to Young Stars International School. Politely decline and steer the conversation back to the school.

            Here is the school's information:
            ---
            ${schoolData}
            ---
            `,
        },
    });
} catch (error) {
    console.error("Fatal: Failed to initialize Gemini AI on load.", error);
}


export const sendMessage = async (message: string) => {
    if (!chat) {
         throw new Error("Chat is not initialized. The AI service failed to start.");
    }

    try {
        const result = await chat.sendMessageStream({ message });
        return result;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to send message. Please try again.");
    }
};
