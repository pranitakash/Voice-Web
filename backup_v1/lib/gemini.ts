import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateSectionContent(prompt: string, sectionType: string) {
    if (!genAI) {
        throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY in .env.local');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `You are an AI architect that generates website section content in JSON format.
Given a user prompt and section type, generate appropriate content.

Section Type: ${sectionType}

Rules:
- For "hero": Return {title: string, subtitle: string, cta: string}
- For "bento": Return {items: Array<{id: string, title: string, description: string, colSpan: number, rowSpan: number}>}
- For "navbar": Return {title: string, links: string[]}
- For "contact": Return {title: string, email: string, phone: string}

Return ONLY valid JSON, no markdown formatting.`;

    const fullPrompt = `${systemPrompt}\n\nUser Prompt: ${prompt}\n\nGenerate content:`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Try to extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: try to parse the entire response
        return JSON.parse(text);
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

export async function generateWebsiteStructure(prompt: string) {
    if (!genAI) {
        throw new Error('Gemini API is not configured. Please set GEMINI_API_KEY in .env.local');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `You are an AI website architect. Given a user's description, generate a complete website structure.

Return a JSON array of sections in this format:
[
  {
    "type": "hero" | "navbar" | "bento" | "contact",
    "content": {...} // Section-specific content
  }
]

Rules:
- Start with a navbar if appropriate
- Include a hero section for the main message
- Add bento grids for features/benefits
- End with contact if needed
- Keep it concise (3-5 sections max)

Return ONLY valid JSON array, no markdown formatting.`;

    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}\n\nGenerate website structure:`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        // Try to extract JSON array from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: try to parse the entire response
        return JSON.parse(text);
    } catch (error) {
        console.error('Error generating structure:', error);
        throw error;
    }
}
