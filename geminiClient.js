const { GoogleGenAI } = require('@google/genai');
const apiKey = process.env.Gemini_API_KEY;
const ai = new GoogleGenAI({ apiKey });

module.exports = ai;