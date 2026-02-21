import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CycleLengthChart({ logs }) {
  const recent = [...logs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).slice(-6);

  const data = {
    labels: recent.map((_, idx) => `Cycle ${idx + 1}`),
    datasets: [
      {
        label: 'Cycle Length (days)',
        data: recent.map((entry) => entry.cycleLength),
        borderColor: '#c65487',
        backgroundColor: 'rgba(198,84,135,0.12)',
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        suggestedMin: 20,
        suggestedMax: 45,
      },
    },
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium text-slate-500">Cycle Length Trend (last 6 cycles)</p>
      {recent.length ? (
        <Line data={data} options={options} />
      ) : (
        <p className="text-sm text-slate-500">Log cycles to view your trend chart.</p>
      )}
    </div>
  );
}
