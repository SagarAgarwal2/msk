import {
    Chart as ChartJS,
    LineElement,
    PointElement
} from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement);

function RevenueChart({ config, personas, mlEngine }) {
  const chartData = useMemo(() => {
    if (!mlEngine || !mlEngine.isReady) return null;

    const pricePoints = [];
    const revenues = [];

    for (let price = 99; price <= 999; price += 25) {
      const testConfig = { ...config, price };
      
      // Use batch prediction for better performance
      const probabilities = mlEngine.predictPurchaseBatch(personas, testConfig);
      const totalRevenue = probabilities.reduce((sum, prob, i) => {
        return sum + (prob / 100) * price * 100 * (personas[i].weight / 100);
      }, 0);

      pricePoints.push('₹' + price);
      revenues.push(totalRevenue / 1000);
    }

    return { pricePoints, revenues };
  }, [config, personas, mlEngine]);

  if (!chartData) return <div>Loading chart...</div>;

  const data = {
    labels: chartData.pricePoints,
    datasets: [{
      label: 'Expected Revenue (₹K)',
      data: chartData.revenues,
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
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
      <Line data={data} options={options} />
    </div>
  );
}

export default RevenueChart;
