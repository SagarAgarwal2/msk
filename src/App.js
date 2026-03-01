import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MLEngine from './services/MLEngine';
import { calculateRuleBasedProbability, generatePersonas } from './services/personaService';

function App() {
  const [config, setConfig] = useState({
    price: 449,
    sugarFree: true,
    packaging: 'basic',
    influencer: true,
    productStage: 'ideation',
    businessModel: 'B2C'
  });

  const [mlEngine] = useState(() => new MLEngine());
  const [personas] = useState(() => generatePersonas());
  const [mlReady, setMlReady] = useState(false);
  const [modelSource, setModelSource] = useState(null); // 'trained' | 'loaded'
  const [modelAccuracy, setModelAccuracy] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeML();
  }, []);

  const initializeML = async () => {
    try {
      // Try IndexedDB first — instant if model was saved before
      const loaded = await mlEngine.loadModel();
      if (loaded) {
        setModelSource('loaded');
      } else {
        // First run: train and save (~10 sec)
        await mlEngine.trainPurchaseModel();
        setModelSource('trained');
      }
      setModelAccuracy(mlEngine.accuracy);
      setMlReady(true);

      const report = mlEngine.getAccuracyReport();
      console.log('=== Model Accuracy Report ===');
      console.log(report.summary);
      console.log('Details:', report.details);
      console.log('Interpretation:', report.interpretation);
    } catch (error) {
      console.error('Failed to initialize ML:', error);
    }
  };

  const retrainModel = async () => {
    setMlReady(false);
    setModelSource(null);
    setModelAccuracy(null);
    mlEngine.clearSavedModel();
    await mlEngine.trainPurchaseModel();
    setModelSource('trained');
    setModelAccuracy(mlEngine.accuracy);
    setMlReady(true);
  };

  const runSimulation = async () => {
    if (!mlReady) return;

    setLoading(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Calculate rule-based probabilities
      const ruleResults = personas.map(p => ({
        persona: p,
        probability: calculateRuleBasedProbability(p, config)
      }));

      const ruleAvgProb = ruleResults.reduce((sum, r) => sum + r.probability, 0) / personas.length;

      // Calculate ML probabilities using batch prediction (much faster!)
      const mlProbabilities = mlEngine.predictPurchaseBatch(personas, config);
      const mlResults = personas.map((p, i) => ({
        persona: p,
        probability: mlProbabilities[i]
      }));

      const mlAvgProb = mlResults.reduce((sum, r) => sum + r.probability, 0) / personas.length;

      // Revenue calculation
      const revenue = mlResults.reduce((sum, r) => {
        return sum + (r.probability / 100) * config.price * 100 * (r.persona.weight / 100);
      }, 0);

      // Churn and CLV
      const churnData = mlResults.map(r => ({
        ...r,
        ...mlEngine.predictChurn(r.persona, r.probability, config.price)
      }));

      const avgCLV = churnData.reduce((sum, d) => sum + d.clv, 0) / churnData.length;

      // Segment analysis
      const segmentChurn = analyzeSegmentChurn(churnData);

      // TAM estimation
      const tamData = mlEngine.estimateTAM(config);

      // Optimal pricing
      const optimalPricing = mlEngine.findOptimalPrice(personas, config);

      // Clustering
      const clusterResult = mlEngine.performClustering(personas, 6);

      setResults({
        ruleProb: ruleAvgProb,
        mlProb: mlAvgProb,
        revenue,
        avgCLV,
        tamData,
        optimalPricing,
        clusterResult,
        segmentChurn,
        ruleResults,
        mlResults
      });

    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSegmentChurn = (churnData) => {
    const segments = {};
    const basePersonaNames = [...new Set(personas.map(p => p.name))];
    
    basePersonaNames.forEach(name => {
      segments[name] = {
        repurchase: [],
        churn: [],
        clv: []
      };
    });

    churnData.forEach(d => {
      if (segments[d.persona.name]) {
        segments[d.persona.name].repurchase.push(d.repurchaseRate);
        segments[d.persona.name].churn.push(d.churnRisk);
        segments[d.persona.name].clv.push(d.clv);
      }
    });

    return Object.keys(segments).map(name => ({
      name,
      avgRepurchase: segments[name].repurchase.reduce((a,b)=>a+b,0) / segments[name].repurchase.length,
      avgChurn: segments[name].churn.reduce((a,b)=>a+b,0) / segments[name].churn.length,
      avgCLV: segments[name].clv.reduce((a,b)=>a+b,0) / segments[name].clv.length
    })).sort((a, b) => b.avgCLV - a.avgCLV);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Sidebar
          config={config}
          setConfig={setConfig}
          onRunSimulation={runSimulation}
          mlReady={mlReady}
          loading={loading}
          modelSource={modelSource}
          onRetrain={retrainModel}
        />
        <Dashboard
          results={results}
          config={config}
          personas={personas}
          loading={loading}
          mlEngine={mlEngine}
          modelAccuracy={modelAccuracy}
        />
      </div>
    </div>
  );
}

export default App;
