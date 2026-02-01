import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    console.log('[API] /api/generate - Request received');

    try {
        const { prompt, currentSections } = await request.json();
        console.log('[API] Prompt:', prompt);
        console.log('[API] Current Sections Count:', currentSections?.length || 0);

        if (!prompt) {
            console.error('[API] Error: No prompt provided');
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('[API] Error: GEMINI_API_KEY environment variable is not defined');
            return NextResponse.json(
                { error: 'GEMINI_API_KEY is missing. Please check your .env.local file.' },
                { status: 500 }
            );
        }

        console.log('[API] Initializing Gemini model (gemini-2.0-flash)...');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const systemPrompt = `You are an expert website builder AI. Your goal is to generate or modify website sections based on user prompts.

CONTEXT:
Current sections on the canvas: ${JSON.stringify(currentSections || [])}

TASK:
Analyze the user's prompt and the current sections.
1. If the user wants to ADD something new (e.g., "Add a pricing section"), return the NEW section.
2. If the user wants to MODIFY an existing section (e.g., "Change hero title to Hello" or "Make bento items dark blue"), return that section with the SAME "id" provided in the context but UPDATED content/styles.
3. If the user wants a GENERAL change (e.g., "Make the whole site look premium"), you can return multiple sections (both new and updated).

SECTION TYPES:
- "hero": { title, subtitle, cta }
- "bento": { items: [{ id, title, description, colSpan, rowSpan }] }
- "navbar": { title, links: string[] }
- "contact": { title, description }

OUTPUT FORMAT:
Return ONLY a valid JSON array of sections. 
- For modifications, keep the "id".
- For new sections, do NOT include an "id" (it will be generated).
Example: [{"id": "existing-id", "type": "hero", "content": {...}}, {"type": "bento", "content": {...}}]`;

        console.log('[API] Sending request to Gemini...');

        let result;
        try {
            // SDK call
            result = await model.generateContent([
                systemPrompt,
                `User request: ${prompt}`
            ]);
        } catch (sdkError: any) {
            console.error('[API] Gemini SDK Call failed:', sdkError);
            return NextResponse.json(
                {
                    error: 'Gemini SDK Error',
                    details: sdkError.message || 'Unknown SDK error'
                },
                { status: 500 }
            );
        }

        if (!result || !result.response) {
            console.error('[API] Empty response from Gemini');
            return NextResponse.json(
                { error: 'Empty response from Gemini' },
                { status: 500 }
            );
        }

        const response = result.response;
        const text = response.text();
        console.log('[API] Gemini Response Text Length:', text?.length || 0);

        if (!text) {
            throw new Error('Gemini returned an empty text response');
        }

        // Clean up markdown code blocks if present
        let jsonText = text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }
        jsonText = jsonText.trim();

        console.log('[API] Cleaned JSON text length:', jsonText.length);

        // Parse and validate
        let sections;
        try {
            sections = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('[API] JSON parse error:', parseError);
            console.error('[API] JSON snippet:', jsonText.substring(0, 100) + '...');
            throw new Error(`Invalid JSON from Gemini: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
        }

        // Validate sections array
        if (!Array.isArray(sections)) {
            console.error('[API] Response is not an array:', sections);
            throw new Error('Gemini response must be an array of sections');
        }

        // Validate each section
        const validTypes = ['hero', 'bento', 'navbar', 'contact'];
        for (const section of sections) {
            if (!section.type || !validTypes.includes(section.type)) {
                console.error('[API] Invalid section type:', section);
                throw new Error(`Invalid section type: ${section.type}`);
            }
            if (!section.content || typeof section.content !== 'object') {
                console.error('[API] Invalid section content:', section);
                throw new Error(`Section ${section.type} missing valid content object`);
            }
        }

        console.log('[API] Successfully generated', sections.length, 'sections');
        console.log('[API] Sections:', JSON.stringify(sections, null, 2));

        return NextResponse.json({ sections });
    } catch (error: any) {
        console.error('[API] Uncaught error in route:', error);
        return NextResponse.json(
            {
                error: 'Internal Server Error',
                details: error.message || 'Unknown error'
            },
            { status: 500 }
        );
    }
}
