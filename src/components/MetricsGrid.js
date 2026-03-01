
function MetricsGrid({ results }) {
  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-label">Rule-Based Probability</div>
        <div className="metric-value">{results.ruleProb.toFixed(1)}%</div>
      </div>
      <div className="metric-card ml-powered">
        <div className="metric-label">ML Predicted Probability</div>
        <div className="metric-value">{results.mlProb.toFixed(1)}%</div>
        <div className="ml-tag">Neural Network</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Estimated Revenue</div>
        <div className="metric-value">₹{(results.revenue / 1000).toFixed(0)}K</div>
      </div>
      <div className="metric-card ml-powered">
        <div className="metric-label">Customer Lifetime Value</div>
        <div className="metric-value">₹{Math.round(results.avgCLV)}</div>
        <div className="ml-tag">Predictive Model</div>
      </div>
      <div className="metric-card ml-powered">
        <div className="metric-label">Market Size (TAM)</div>
        <div className="metric-value">{(results.tamData.total / 1000000).toFixed(1)}M</div>
        <div className="ml-tag">Regression</div>
      </div>
    </div>
  );
}

export default MetricsGrid;
