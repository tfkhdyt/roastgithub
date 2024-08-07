import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

export const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
