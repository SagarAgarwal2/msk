
function ChurnTable({ segmentChurn }) {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Segment</th>
          <th>Repurchase Rate</th>
          <th>Churn Risk</th>
          <th>CLV</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {segmentChurn.map((s, index) => {
          const priority = s.avgCLV > 1500 ? '🔥 High' : s.avgCLV > 800 ? '⚠️ Medium' : '📊 Track';
          const churnColor = s.avgChurn > 40 ? '#f8d7da' : s.avgChurn > 25 ? '#fff3cd' : '#d4edda';
          
          return (
            <tr key={index} style={{ background: churnColor }}>
              <td><strong>{s.name}</strong></td>
              <td>{s.avgRepurchase.toFixed(1)}%</td>
              <td>{s.avgChurn.toFixed(1)}%</td>
              <td>₹{Math.round(s.avgCLV)}</td>
              <td>{priority}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ChurnTable;
