
function RegionalData({ tamData, price }) {
  return (
    <div className="insights-section ml-insights">
      <h3>🌍 Regional Market Size Estimation</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Total TAM</div>
          <div style={{ fontSize: '1.8em', color: '#667eea' }}>
            {(tamData.total / 1000000).toFixed(1)}M customers
          </div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Market Value</div>
          <div style={{ fontSize: '1.8em', color: '#667eea' }}>
            ₹{((tamData.total * price * 0.02) / 1000000000).toFixed(1)}B
          </div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Urban Markets</div>
          <div style={{ fontSize: '1.5em', color: '#667eea' }}>
            {(tamData.urban / 1000000).toFixed(1)}M
          </div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Tier-2 Markets</div>
          <div style={{ fontSize: '1.5em', color: '#667eea' }}>
            {(tamData.tier2 / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionalData;
