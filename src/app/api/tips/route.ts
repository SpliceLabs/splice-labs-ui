import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import Parser from "rss-parser";

export const runtime = "nodejs";
export const revalidate = 86400; // 24 hours ISR

// In-memory cache for tips
let cachedTips: Tip[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface Tip {
  tag: string;
  tip: string;
  source?: string;
}

interface FeedItem {
  title?: string;
  contentSnippet?: string;
  link?: string;
}

// RSS feeds — tech + health + lifestyle
const FEEDS = [
  // Tech / AI
  "https://hnrss.org/newest?q=AI+OR+LLM+OR+agents+OR+web3+OR+crypto",
  "https://techcrunch.com/tag/artificial-intelligence/feed/",
  "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  // Health / Wellness / Science
  "https://www.sciencedaily.com/rss/health_medicine/nutrition.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml",
  "https://www.medicalnewstoday.com/rss",
];

// Topics — tech + wellness + wisdom from everywhere
const TOPICS = [
  // Tech
  "ai_native",
  "context",
  "memory",
  "web4",
  "web3",
  "agents",
  "inference",
  "crypto",
  // Health & Nutrition
  "omega3",
  "turmeric",
  "spices",
  "hydration",
  "sleep",
  "gut_health",
  "longevity",
  "ayurveda",
  "fruits",
  "whole_foods",
  // Movement & Body
  "walk",
  "exercise",
  "breath",
  "posture",
  // Mind & Habits
  "mindfulness",
  "habits",
  "focus",
  "stillness",
  "compound",
  "systems",
  "gratitude",
  // Pop Culture Wisdom
  "star_wars",
  "pixar",
  "disney",
  "tolkien",
  "marvel",
  "nolan",
];

// Fallback tips when API is unavailable — variety across all domains
const FALLBACK_TIPS: Tip[] = [
  // Tech
  { tag: "ai_native", tip: "AI-native apps treat models as first-class compute, not bolt-on features." },
  { tag: "context", tip: "Context is the new RAM — the more you can pass, the smarter the system." },
  { tag: "memory", tip: "Persistent memory turns stateless LLMs into evolving collaborators." },
  { tag: "agents", tip: "Agents = LLMs + tools + loops. Autonomy emerges from iteration." },
  { tag: "web3", tip: "Wallets are identity. Transactions are reputation. Code is law." },
  // Health & Wellness
  { tag: "omega3", tip: "Your brain is 60% fat. Feed it the right fats — wild salmon, sardines, walnuts." },
  { tag: "turmeric", tip: "Curcumin + black pepper + fat = bioavailability. Ancient wisdom, modern science." },
  { tag: "hydration", tip: "Thirst arrives after dehydration begins. Water before coffee, always." },
  { tag: "sleep", tip: "8 hours isn't a luxury. It's when your glymphatic system clears brain waste." },
  { tag: "gut_health", tip: "90% of serotonin is made in your gut. Feed your microbiome diversity." },
  { tag: "spices", tip: "Indian kitchen = pharmacy. Fenugreek, cumin, coriander — each a functional food." },
  { tag: "ayurveda", tip: "Eat warm food. Chew slowly. Digestion begins with attention." },
  // Movement & Body
  { tag: "walk", tip: "A 20-minute walk beats an hour of scrolling. Your best ideas come mid-stride." },
  { tag: "exercise", tip: "Exercise is the only drug that treats everything. Dose daily." },
  { tag: "breath", tip: "Breathe through your nose. Your mouth is for eating and speaking, not breathing." },
  { tag: "posture", tip: "Your spine is an antenna. Straighten it to think clearer." },
  // Fruits & Whole Foods
  { tag: "fruits", tip: "Berries are brain food. Blueberries, blackberries — nature's nootropics." },
  { tag: "whole_foods", tip: "If it has a commercial, it's probably not food. Eat ingredients, not products." },
  // Mind & Habits
  { tag: "mindfulness", tip: "Five minutes of stillness > five hours of distracted work." },
  { tag: "habits", tip: "Motivation fades. Habits compound. Build the rails, then ride them." },
  { tag: "compound", tip: "Small daily improvements compound. 1% better daily = 37x better yearly." },
  { tag: "stillness", tip: "The mind that's always busy is the mind that misses everything." },
  { tag: "focus", tip: "Attention is a finite resource. Spend it like money, not like water." },
  { tag: "systems", tip: "You don't rise to your goals. You fall to your systems." },
  { tag: "gratitude", tip: "Gratitude rewires your brain. Name three things before you sleep." },
  { tag: "longevity", tip: "The centenarians all have one thing in common: community, not supplements." },
  // Star Wars
  { tag: "star_wars", tip: "Do or do not. There is no try. — Commitment precedes capability." },
  { tag: "star_wars", tip: "Fear leads to anger, anger to hate. Watch the chain reaction." },
  { tag: "star_wars", tip: "Your focus determines your reality. Choose where you point attention." },
  // Disney & Pixar
  { tag: "pixar", tip: "Adventure is out there. But first, you have to open the door." },
  { tag: "disney", tip: "The flower that blooms in adversity is the rarest of all." },
  { tag: "pixar", tip: "To infinity and beyond — ambition without limits, grounded in friendship." },
  { tag: "disney", tip: "Hakuna Matata isn't ignorance. It's choosing which problems deserve energy." },
  { tag: "pixar", tip: "Anyone can cook. Talent can come from anywhere. Stay open." },
  // Tolkien
  { tag: "tolkien", tip: "Even the smallest person can change the course of the future." },
  { tag: "tolkien", tip: "All we have to decide is what to do with the time given us." },
  { tag: "disney", tip: "The past can hurt. But you can either run from it or learn from it." },
  // Marvel & Nolan
  { tag: "marvel", tip: "With great power comes great responsibility. Scale demands ethics." },
  { tag: "marvel", tip: "I am Iron Man. Own your identity, flaws and all." },
  { tag: "nolan", tip: "Time is the fire in which we burn. Use it before it uses you." },
  { tag: "nolan", tip: "Don't try to understand it. Feel it. — Intuition before analysis." },
];

async function fetchNewsHeadlines(): Promise<string[]> {
  const parser = new Parser();
  const headlines: string[] = [];

  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const items = feed.items.slice(0, 10) as FeedItem[];
      for (const item of items) {
        if (item.title) {
          headlines.push(`${item.title}${item.contentSnippet ? `: ${item.contentSnippet.slice(0, 100)}` : ""}`);
        }
      }
    } catch {
      // Skip failed feeds
    }
  }

  return headlines.slice(0, 30); // Max 30 headlines
}

async function generateTipsFromNews(headlines: string[]): Promise<Tip[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("ANTHROPIC_API_KEY not set, using fallback tips");
    return FALLBACK_TIPS;
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = `You are a creative insight generator for Splice Labs — blending tech wisdom with life wisdom.

Given these recent headlines from tech and health news:
${headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}

Generate 15 short, pithy tips/insights across these domains:
${TOPICS.join(", ")}

Mix it up — roughly:
- 4 tips about AI, web3, agents, crypto, tech trends
- 4 tips about health, nutrition, spices, movement, sleep
- 4 tips about habits, mindfulness, focus, life systems
- 3 tips drawing from pop culture (Star Wars, Pixar, Disney, Tolkien, Marvel, Nolan films) — connect fictional wisdom to modern life

Rules:
- Each tip should be 10-20 words max
- Be creative, provocative, slightly cryptic — fortune cookie meets wisdom literature
- Connect news to deeper principles (not just summarize)
- Mix timely observations with timeless insights
- Use present tense, active voice
- No corporate speak, no hype words
- Make them memorable, quotable

Return JSON array with format:
[{"tag": "topic_tag", "tip": "The insight text here."}]

Only return valid JSON, no other text.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const tips = JSON.parse(text) as Tip[];
    return tips;
  } catch (error) {
    console.error("Failed to generate tips:", error);
    return FALLBACK_TIPS;
  }
}

export async function GET() {
  // Check cache
  const now = Date.now();
  if (cachedTips && now - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json({ tips: cachedTips, cached: true });
  }

  try {
    // Fetch fresh news and generate tips
    const headlines = await fetchNewsHeadlines();
    const tips = headlines.length > 0
      ? await generateTipsFromNews(headlines)
      : FALLBACK_TIPS;

    // Update cache
    cachedTips = tips;
    cacheTimestamp = now;

    return NextResponse.json({ tips, cached: false });
  } catch (error) {
    console.error("Tips API error:", error);
    return NextResponse.json({ tips: FALLBACK_TIPS, cached: false, error: true });
  }
}
