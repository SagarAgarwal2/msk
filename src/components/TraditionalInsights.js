import { basePersonas, calculateRuleBasedProbability } from '../services/personaService';

function TraditionalInsights({ mlProb, personas, config, optimalPrice }) {
  // Find most responsive segment using rule-based calculation
  const sortedSegments = basePersonas.map(bp => {
    const segmentPersonas = personas.filter(p => p.name === bp.name);
    const avgProb = segmentPersonas.reduce((sum, p) => {
      return sum + calculateRuleBasedProbability(p, config);
    }, 0) / segmentPersonas.length;
    return { name: bp.name, prob: avgProb };
  }).sort((a, b) => b.prob - a.prob);

  // Risk assessment
  let riskLevel = 'Low';
  let riskClass = 'risk-low';
  if (mlProb < 40) {
    riskLevel = 'High';
    riskClass = 'risk-high';
  } else if (mlProb < 60) {
    riskLevel = 'Medium';
    riskClass = 'risk-medium';
  }

  // Recommendation
  let recommendation = '';
  if (config.price !== optimalPrice) {
    recommendation = `ML recommends adjusting price to ₹${optimalPrice} for maximum revenue.`;
  } else {
    recommendation = 'Current pricing is optimal according to ML model. Focus on execution and distribution.';
  }

  return (
    <div className="insights-section">
      <h3>💡 Traditional Business Insights</h3>
      <div className="insight-item">
        <div className="insight-label">Most Responsive Segment</div>
        <div className="insight-value">
          {sortedSegments[0].name} ({sortedSegments[0].prob.toFixed(1)}% rule-based probability)
        </div>
      </div>
      <div className="insight-item">
        <div className="insight-label">Launch Risk Level</div>
        <div className="insight-value">
          <span className={`risk-badge ${riskClass}`}>{riskLevel}</span>
        </div>
      </div>
      <div className="insight-item">
        <div className="insight-label">Strategic Recommendation</div>
        <div className="insight-value">{recommendation}</div>
      </div>
    </div>
  );
}

export default TraditionalInsights;
