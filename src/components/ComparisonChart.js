import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { basePersonas } from '../services/personaService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ComparisonChart({ ruleResults, mlResults, personas }) {
  const segments = {};
  basePersonas.forEach(bp => {
    segments[bp.name] = { rule: 0, ml: 0, count: 0 };
  });

  ruleResults.forEach((r, i) => {
    if (segments[r.persona.name]) {
      segments[r.persona.name].rule += r.probability;
      segments[r.persona.name].ml += mlResults[i].probability;
      segments[r.persona.name].count++;
    }
  });

  const labels = Object.keys(segments);
  const ruleData = labels.map(l => segments[l].rule / segments[l].count);
  const mlData = labels.map(l => segments[l].ml / segments[l].count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Rule-Based',
        data: ruleData,
        backgroundColor: '#999',
        borderRadius: 6
      },
      {
        label: 'ML Model',
        data: mlData,
        backgroundColor: '#43e97b',
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ComparisonChart;
