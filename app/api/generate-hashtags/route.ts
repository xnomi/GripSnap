import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const prompt = `You are a social media hashtag expert. Generate a JSON object of relevant hashtags for the topic: "${topic}".
Group them into 3 categories: niche, trending, broad.
Each category should be an array of objects with 'tag' (string starting with #) and 'reach' (low, medium, high).

Example output format:
{
  "niche": [{ "tag": "#specificTopic1", "reach": "low" }],
  "trending": [{ "tag": "#trendingNow", "reach": "high" }],
  "broad": [{ "tag": "#generalTopic", "reach": "high" }]
}

Output ONLY valid JSON. Do not include markdown blocks like \`\`\`json.`;

    if (process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = (response.content[0] as unknown as { text: string }).text;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const hashtags = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
        return NextResponse.json(hashtags);
      } catch {
        return NextResponse.json({ error: 'Parsing error' }, { status: 500 });
      }
    } else {
      // Mock response
      const cleanTopic = topic.replace(/\s+/g, '').toLowerCase();
      return NextResponse.json({
        niche: [
          { tag: `#${cleanTopic}tips`, reach: 'low' },
          { tag: `#${cleanTopic}tricks`, reach: 'low' },
          { tag: `#${cleanTopic}community`, reach: 'medium' },
        ],
        trending: [
          { tag: `#${cleanTopic}2026`, reach: 'high' },
          { tag: `#viral${cleanTopic}`, reach: 'high' },
        ],
        broad: [
          { tag: `#${cleanTopic}`, reach: 'high' },
          { tag: `#lifestyle`, reach: 'high' },
          { tag: `#foryou`, reach: 'high' },
        ],
      });
    }
  } catch (error) {
    console.error('Hashtag generation error:', error);
    return NextResponse.json({ error: 'Failed to generate hashtags' }, { status: 500 });
  }
}
