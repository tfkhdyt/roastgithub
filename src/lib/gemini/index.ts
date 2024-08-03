import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "$env/static/private";

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
