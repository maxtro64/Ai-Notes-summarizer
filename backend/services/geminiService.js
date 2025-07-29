import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(key);

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 32,
  maxOutputTokens: 2000,
};

const safetySettings = [
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
];

// 🧠 STUDY ASSISTANT STYLE GENERATOR
export const generateSummary = async (text, options = {}) => {
  try {
    if (!text || typeof text !== 'string' ) {
      throw new Error('Input text must be a string with at least 15 characters');
    }

    const {
      complexity = 'medium', // medium | detailed
      style = 'default',     // whatsapp | formal | default
      tone = 'neutral'       // friendly | humorous | neutral
    } = options;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig,
      safetySettings
    });

    // 📚 Build the base prompt
    let prompt = `You're a smart, friendly study assistant helping a student understand anything they want and can talk to you like they are talking to their freind `;

    if (complexity.toLowerCase() === 'detailed') {
      prompt += `Give a detailed explanation with key points, real-world examples, and clarity. `;
    } else {
      prompt += `Summarize the main points clearly in 3–5 short bullet points. `;
    }

    // 💬 Style options
    if (style.toLowerCase() === 'whatsapp') {
      prompt += `Use casual WhatsApp-style language with emojis, short phrases, and relatable examples. `;
    } else if (style.toLowerCase() === 'formal') {
      prompt += `Use a clear, professional tone suitable for academic or work settings. `;
    }

    // 🎭 Tone options
    if (tone.toLowerCase() === 'friendly') {
      prompt += `Keep the tone friendly and encouraging, like you're tutoring a classmate. `;
    } else if (tone.toLowerCase() === 'humorous') {
      prompt += `Add light humor, fun analogies, or quirky comparisons to keep it engaging. `;
    }

    prompt += `\n\nHere’s the topic:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (!response || !response.text) {
      throw new Error('No valid response from Gemini API');
    }

    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};
