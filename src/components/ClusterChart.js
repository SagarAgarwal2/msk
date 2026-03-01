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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ClusterChart({ clusterResult }) {
  const clusterCounts = {};
  clusterResult.assignments.forEach(c => {
    clusterCounts[c] = (clusterCounts[c] || 0) + 1;
  });

  const data = {
    labels: Object.keys(clusterCounts).map(c => `Cluster ${parseInt(c)+1}`),
    datasets: [{
      label: 'Number of Customers',
      data: Object.values(clusterCounts),
      backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'],
      borderRadius: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ClusterChart;
