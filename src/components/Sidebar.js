
function Sidebar({ config, setConfig, onRunSimulation, mlReady, loading, modelSource, onRetrain }) {
  const handlePriceChange = (e) => {
    setConfig({ ...config, price: parseInt(e.target.value) });
  };

  const handleSugarFreeToggle = (value) => {
    setConfig({ ...config, sugarFree: value });
  };

  const handlePackagingChange = (e) => {
    setConfig({ ...config, packaging: e.target.value });
  };

  const handleInfluencerToggle = (value) => {
    setConfig({ ...config, influencer: value });
  };

  const handleProductStageChange = (e) => {
    setConfig({ ...config, productStage: e.target.value });
  };

  const handleBusinessModelToggle = (value) => {
    setConfig({ ...config, businessModel: value });
  };

  const statusText = () => {
    if (!mlReady) return modelSource === null ? '🔄 Training ML model from scratch...' : '🔄 Loading model...';
    if (modelSource === 'loaded') return '⚡ ML model loaded from cache — instant start!';
    return '✅ ML model trained (1,600 scenarios) and saved.';
  };

  const statusClass = !mlReady ? 'ml-status training' : modelSource === 'loaded' ? 'ml-status cached' : 'ml-status ready';

  return (
    <div className="sidebar">
      <h2>Product Configuration</h2>

      <div className="input-group">
        <label>Price (INR)</label>
        <input
          type="range"
          min="99"
          max="999"
          step="10"
          value={config.price}
          onChange={handlePriceChange}
        />
        <div className="value-display">₹{config.price}</div>
      </div>

      <div className="input-group">
        <label>Product Stage</label>
        <select className="config-select" value={config.productStage || 'ideation'} onChange={handleProductStageChange}>
          <option value="ideation">💡 Ideation</option>
          <option value="mvp">🔧 MVP Ready</option>
          <option value="selling">🚀 Already Selling</option>
        </select>
        <div className="stage-badge-row">
          {(!config.productStage || config.productStage === 'ideation') && <span className="stage-badge ideation">💡 Concept phase — validating demand</span>}
          {config.productStage === 'mvp' && <span className="stage-badge mvp">🔧 MVP built — testing market fit</span>}
          {config.productStage === 'selling' && <span className="stage-badge selling">🚀 Live — optimizing growth</span>}
        </div>
      </div>

      <div className="input-group">
        <label>Business Model</label>
        <div className="toggle-group">
          <button className={`toggle-btn ${(!config.businessModel || config.businessModel === 'B2C') ? 'active' : ''}`} onClick={() => handleBusinessModelToggle('B2C')}>B2C</button>
          <button className={`toggle-btn ${config.businessModel === 'B2B' ? 'active' : ''}`} onClick={() => handleBusinessModelToggle('B2B')}>B2B</button>
          <button className={`toggle-btn ${config.businessModel === 'B2B2C' ? 'active' : ''}`} onClick={() => handleBusinessModelToggle('B2B2C')}>B2B2C</button>
        </div>
        <div className="stage-badge-row">
          {(!config.businessModel || config.businessModel === 'B2C') && <span className="stage-badge b2c">🛒 Selling direct to end consumers</span>}
          {config.businessModel === 'B2B' && <span className="stage-badge b2b">🏢 Selling to businesses / retailers</span>}
          {config.businessModel === 'B2B2C' && <span className="stage-badge b2b2c">🔗 Through business to reach consumers</span>}
        </div>
      </div>

      <div className="input-group">
        <label>Sugar-Free Option</label>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${!config.sugarFree ? 'active' : ''}`}
            onClick={() => handleSugarFreeToggle(false)}
          >
            No
          </button>
          <button
            className={`toggle-btn ${config.sugarFree ? 'active' : ''}`}
            onClick={() => handleSugarFreeToggle(true)}
          >
            Yes
          </button>
        </div>
      </div>

      <div className="input-group">
        <label>Packaging Type</label>
        <select value={config.packaging} onChange={handlePackagingChange}>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <div className="input-group">
        <label>Influencer Marketing Campaign</label>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${!config.influencer ? 'active' : ''}`}
            onClick={() => handleInfluencerToggle(false)}
          >
            No
          </button>
          <button
            className={`toggle-btn ${config.influencer ? 'active' : ''}`}
            onClick={() => handleInfluencerToggle(true)}
          >
            Yes
          </button>
        </div>
      </div>

      <button
        className="run-btn"
        onClick={onRunSimulation}
        disabled={!mlReady || loading}
      >
        {loading ? '⏳ Running...' : '🚀 Run ML Simulation'}
      </button>

      {mlReady && (
        <button
          className="retrain-btn"
          onClick={onRetrain}
          disabled={loading}
          title="Clears saved model and retrains from scratch"
        >
          🔄 Retrain Model
        </button>
      )}
    </div>
  );
}

export default Sidebar;
