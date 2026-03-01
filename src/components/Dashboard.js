import AIChatbot from './AIChatbot';
import ChurnTable from './ChurnTable';
import ClusterChart from './ClusterChart';
import ComparisonChart from './ComparisonChart';
import LLMInsightsPanel from './LLMInsightsPanel';
import MetricsGrid from './MetricsGrid';
import OptimalPricingCard from './OptimalPricingCard';
import RegionalData from './RegionalData';
import RevenueChart from './RevenueChart';
import TraditionalInsights from './TraditionalInsights';

function Dashboard({ results, config, personas, loading, mlEngine, modelAccuracy }) {
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <div>Running ML predictions on 25,000 personas...</div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="dashboard">
        <div className="placeholder">
          👆 Configure product parameters and click "Run ML Simulation" to see AI-powered insights
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {modelAccuracy && (
        <div className="accuracy-banner">
          <span className="accuracy-icon">
            {modelAccuracy.accuracy > 0.85 ? '✅' : modelAccuracy.accuracy > 0.75 ? '🟢' : '⚠️'}
          </span>
          <strong>Confidence Score: {(modelAccuracy.accuracy * 100).toFixed(1)}%</strong>
          <span className="accuracy-detail">
            R²={modelAccuracy.r2Score.toFixed(2)} | MAE={modelAccuracy.mae.toFixed(3)} | Tested on {modelAccuracy.testSamples} samples
          </span>
        </div>
      )}

      <MetricsGrid results={results} />
      
      <OptimalPricingCard 
        optimalPricing={results.optimalPricing}
        currentPrice={config.price}
        currentRevenue={results.revenue}
        modelAccuracy={modelAccuracy}
      />

      <div className="chart-section">
        <h3>📊 ML-Discovered Customer Clusters</h3>
        <ClusterChart clusterResult={results.clusterResult} />
        <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
          K-means clustering identified <strong>{results.clusterResult.centroids.length}</strong> natural customer segments
        </div>
      </div>

      <div className="chart-section">
        <h3>📈 Purchase Probability: Rule-Based vs ML Model</h3>
        <ComparisonChart 
          ruleResults={results.ruleResults}
          mlResults={results.mlResults}
          personas={personas}
        />
      </div>

      <div className="chart-section">
        <h3>💰 Revenue Optimization Curve</h3>
        <RevenueChart config={config} personas={personas} mlEngine={mlEngine} />
      </div>

      <div className="insights-section ml-insights">
        <h3>🎯 Churn & Retention Prediction</h3>
        <ChurnTable segmentChurn={results.segmentChurn} />
      </div>

      <TraditionalInsights 
        mlProb={results.mlProb}
        personas={personas}
        config={config}
        optimalPrice={results.optimalPricing.optimalPrice}
      />

      <RegionalData tamData={results.tamData} price={config.price} />

      {/* ── Groq LLM Layer ── */}
      <LLMInsightsPanel results={results} config={config} />

      <AIChatbot results={results} config={config} />
    </div>
  );
}

export default Dashboard;
