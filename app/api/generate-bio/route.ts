import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { name, profession, keywords, tone } = await req.json();

    const prompt = `You are an expert social media manager. Generate 5 short, impactful social media bios based on the following information:
Name: ${name}
Profession: ${profession}
Keywords: ${keywords}
Tone: ${tone}

Rules:
1. Provide exactly 5 distinct variations.
2. Keep them under 150 characters if possible.
3. Include relevant emojis.
4. Format the output as a JSON array of strings. Do NOT include markdown blocks, just the JSON array.
Example format: ["Bio 1", "Bio 2", "Bio 3", "Bio 4", "Bio 5"]`;

    // Try API if available, else mock
    if (process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = (response.content[0] as unknown as { text: string }).text;
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const bios = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
        return NextResponse.json({ bios });
      } catch {
        return NextResponse.json({ bios: [text] }); // fallback
      }
    } else {
      // Mock response for demonstration when no API key
      return NextResponse.json({
        bios: [
          `✨ ${name} | ${profession} ✨\nMaking magic happen. ${keywords} 🚀`,
          `${profession} by day, dreamer by night. ${tone} vibes only. ✌️ ${name}`,
          `Hi, I'm ${name}! 👋 ${profession} focusing on ${keywords}. Let's connect!`,
          `Living for ${keywords} | ${profession} | ${tone} spirit 🌟`,
          `${name} 📍 Creating cool things. ${profession} enthusiast.`
        ]
      });
    }
  } catch (error) {
    console.error('Bio generation error:', error);
    return NextResponse.json({ error: 'Failed to generate bios' }, { status: 500 });
  }
}
