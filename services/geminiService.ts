import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClassificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const classificationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    primaryCategory: {
      type: Type.STRING,
      description: "The single most relevant category for the news article (e.g., Politics, Economy, Sports).",
    },
    allCategories: {
      type: Type.ARRAY,
      description: "A list of relevant categories with their confidence scores.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 100" }
        },
        required: ["category", "confidence"]
      }
    },
    tags: {
      type: Type.ARRAY,
      description: "5-7 smart keyword tags related to the entities, locations, or specific topics in the article.",
      items: { type: Type.STRING }
    },
    summary: {
      type: Type.STRING,
      description: "A brief 1-sentence summary of the article."
    },
    sentiment: {
      type: Type.STRING,
      enum: ["Positive", "Neutral", "Negative"],
      description: "The overall sentiment of the article."
    }
  },
  required: ["primaryCategory", "allCategories", "tags", "summary", "sentiment"]
};

export const classifyArticle = async (headline: string, body: string): Promise<ClassificationResult> => {
  try {
    const prompt = `
      Classify the following news article. 
      Analyze the text deeply to identify the main theme and any secondary themes.
      
      Headline: ${headline}
      Body: ${body}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: classificationSchema,
        systemInstruction: "You are DRM Categorizer, an advanced AI system specialized in classifying news content for media outlets. Be precise, objective, and handle multi-topic articles by assigning confidence scores."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as ClassificationResult;
  } catch (error) {
    console.error("Classification error:", error);
    throw error;
  }
};