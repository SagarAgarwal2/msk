const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

class GroqService {

  // ── 1. Business Insights ─────────────────────────────────────────────────
  async generateBusinessInsights(results, config) {
    const prompt = `
You are a senior FMCG market analyst in India.
Analyse this ML simulation data (25,000 virtual Indian consumers) and give sharp business insights.

PRODUCT: Women's Protein Drink
Price: ₹${config.price} | Sugar-Free: ${config.sugarFree ? 'Yes' : 'No'} | Packaging: ${config.packaging} | Influencer: ${config.influencer ? 'Active' : 'Off'}

SIMULATION RESULTS:
- ML Purchase Probability: ${results.mlProb?.toFixed(1)}%
- Rule-Based Probability:   ${results.ruleProb?.toFixed(1)}%
- Monthly Revenue:          ₹${Math.round(results.revenue)?.toLocaleString('en-IN')}
- Avg Customer CLV:         ₹${Math.round(results.avgCLV)}
- Optimal Price (ML):       ₹${results.optimalPricing?.optimalPrice}
- TAM:                      ${results.tamData?.total?.toLocaleString('en-IN')} customers

Give me:
1. LAUNCH VERDICT (Go / No-Go with 2-line reason)
2. TOP 3 OPPORTUNITIES (specific, actionable)
3. TOP 3 RISKS (severity: Low / Medium / High)
4. PRICING STRATEGY (1 paragraph)
5. 30-DAY ACTION PLAN (5 bullet points)

Be direct, data-driven and India-market specific. Use ₹ for currency.
`;
    return this.callGroq(prompt, 'llama-3.1-8b-instant');
  }

  // ── 2. Investor Pitch ────────────────────────────────────────────────────
  async generateInvestorPitch(results, config) {
    const prompt = `
You are helping an MBA student pitch a new FMCG product at a hackathon.

SIMULATION DATA (25,000-persona ML Digital Twin):
- Product: Women's Protein Drink, India
- Price: ₹${config.price}
- ML Purchase Probability: ${results.mlProb?.toFixed(1)}%
- Monthly Revenue Potential: ₹${Math.round(results.revenue)?.toLocaleString('en-IN')}
- Total Addressable Market: ${results.tamData?.total?.toLocaleString('en-IN')} customers
- Optimal Price: ₹${results.optimalPricing?.optimalPrice}

Write a compelling investor pitch:
1. HOOK (1 shocking India protein market statistic)
2. PROBLEM (2 sentences, data-driven)
3. SOLUTION (2 sentences)
4. MARKET OPPORTUNITY (TAM/SAM/SOM with numbers)
5. TRACTION / VALIDATION (reference the Digital Twin simulation)
6. WHY NOW (3 India-specific trends)
7. ASK (funding ask and use of funds)

Punchy, MBA hackathon style. Max 400 words.
`;
    return this.callGroq(prompt, 'llama-3.1-8b-instant');
  }

  // ── 3. Risk Analysis ─────────────────────────────────────────────────────
  async generateRiskAnalysis(results, config) {
    const prompt = `
You are an FMCG risk consultant advising on an India product launch.

Product: Women's Protein Drink | ₹${config.price} | ${config.sugarFree ? 'Sugar-Free' : 'Regular'}
ML Purchase Probability: ${results.mlProb?.toFixed(1)}%
Monthly Revenue: ₹${Math.round(results.revenue)?.toLocaleString('en-IN')}

Provide a structured risk register:
1. MARKET RISKS (3 risks, each with severity Low/Medium/High + mitigation)
2. COMPETITIVE RISKS (top 3 India FMCG competitors and their threat level)
3. OPERATIONAL RISKS (supply chain, distribution)
4. FINANCIAL RISKS (break-even analysis, cash flow concern)
5. OVERALL RISK SCORE: X/10 with verdict

Be specific to India FMCG market conditions in 2025-26.
`;
    return this.callGroq(prompt, 'llama-3.1-8b-instant');
  }

  // ── 4. Marketing Copy ────────────────────────────────────────────────────
  async generateMarketingCopy(topSegment, config, mlProb) {
    const prompt = `
You are a top Indian marketing copywriter specialising in FMCG.

PRODUCT: Women's Protein Drink (${config.sugarFree ? 'Sugar-Free' : 'Regular'}) | ₹${config.price} | ${config.packaging} packaging
TARGET: ${topSegment} Indian women | ML-predicted purchase likelihood: ${mlProb?.toFixed(1)}%

Generate ready-to-use marketing assets:
1. INSTAGRAM CAPTION (150 chars, with 5 relevant hashtags)
2. WHATSAPP MESSAGE (conversational, 50 words, Hinglish OK)
3. TAGLINE (5-7 words, punchy)
4. 15-SECOND VIDEO SCRIPT (hook + value prop + CTA)
5. OBJECTION HANDLER ("Too expensive" → response in 2 sentences)

Make it feel authentic for Indian women consumers in 2025.
`;
    return this.callGroq(prompt, 'llama-3.1-8b-instant');
  }

  // ── 5. Q&A Chatbot ───────────────────────────────────────────────────────
  async answerQuestion(question, results, config) {
    const ctx = results ? `
Simulation context (25,000-persona ML Digital Twin):
- Price ₹${config.price} | Sugar-Free: ${config.sugarFree} | Packaging: ${config.packaging} | Influencer: ${config.influencer}
- ML Purchase Probability: ${results.mlProb?.toFixed(1)}%
- Monthly Revenue: ₹${Math.round(results.revenue)?.toLocaleString('en-IN')}
- Optimal Price: ₹${results.optimalPricing?.optimalPrice}
- Avg CLV: ₹${Math.round(results.avgCLV)}
- TAM: ${results.tamData?.total?.toLocaleString('en-IN')} customers
` : 'No simulation run yet.';

    const prompt = `
You are an AI business analyst for an FMCG Digital Twin simulator.
Answer the user's question concisely using the simulation data.
Be practical and India-market specific. Max 200 words.

${ctx}

User question: ${question}
`;
    return this.callGroq(prompt, 'llama-3.1-8b-instant');
  }

  // ── Core API call ─────────────────────────────────────────────────────────
  async callGroq(prompt, model = 'llama-3.1-8b-instant') {
    if (!GROQ_API_KEY) {
      return '⚠️ Groq API key missing. Add REACT_APP_GROQ_API_KEY to the .env file.';
    }
    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      return data.choices[0]?.message?.content || 'No response generated.';
    } catch (err) {
      console.error('Groq error:', err);
      return `❌ Groq API error: ${err.message}`;
    }
  }
}

export default new GroqService();
