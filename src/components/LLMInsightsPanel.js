import { useState } from 'react';
import groqService from '../services/groqService';

const INSIGHT_TYPES = [
  { id: 'business', label: '📊 Business Insights', model: 'llama-3.1-8b-instant' },
  { id: 'investor', label: '💰 Investor Pitch',    model: 'llama-3.1-8b-instant' },
  { id: 'risk',     label: '⚠️ Risk Analysis',     model: 'llama-3.1-8b-instant' },
  { id: 'marketing',label: '📣 Marketing Copy',    model: 'llama-3.1-8b-instant' },
];

function LLMInsightsPanel({ results, config }) {
  const [active, setActive]   = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async (type) => {
    if (!results) return;
    setActive(type);
    setContent('');
    setLoading(true);

    let text = '';
    switch (type) {
      case 'business':
        text = await groqService.generateBusinessInsights(results, config);
        break;
      case 'investor':
        text = await groqService.generateInvestorPitch(results, config);
        break;
      case 'risk':
        text = await groqService.generateRiskAnalysis(results, config);
        break;
      case 'marketing':
        // Pass the top-CLV segment name as the target
        const topSegment = results.segmentChurn?.[0]?.name || 'Urban Health Enthusiast';
        text = await groqService.generateMarketingCopy(topSegment, config, results.mlProb);
        break;
      default:
        break;
    }

    setContent(text);
    setLoading(false);
  };

  return (
    <div className="llm-panel">
      <div className="llm-panel-header">
        <h3>🧠 Groq LLM Intelligence Layer</h3>
        <p>Real-time AI analysis of your 25,000-persona simulation · Llama 3.1</p>
      </div>

      {!results && (
        <div className="llm-placeholder">
          ▶ Run the ML Simulation first to unlock AI-generated insights
        </div>
      )}

      <div className="llm-buttons">
        {INSIGHT_TYPES.map(({ id, label }) => (
          <button
            key={id}
            className={`llm-btn ${active === id ? 'active' : ''}`}
            onClick={() => generate(id)}
            disabled={loading || !results}
          >
            {loading && active === id ? '⏳ Generating...' : label}
          </button>
        ))}
      </div>

      {content && (
        <div className="llm-output">
          {content.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </div>
      )}
    </div>
  );
}

export default LLMInsightsPanel;
