import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useFitness } from "../../context/FitnessContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function WeightChart() {
  const { weightHistory } = useFitness();

  const data = {
    labels: weightHistory.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: "MASS",
        data: weightHistory.map(d => d.weight),
        borderColor: "#ffffff",
        backgroundColor: "rgba(255,255,255,0.05)",
        fill: true,
        tension: 0.5,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 6,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        titleFont: { size: 10, family: 'Inter', weight: 'bold' },
        bodyFont: { size: 14, family: 'Inter', weight: 'black' },
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} KG`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10, weight: 'bold' } },
        grid: { display: false }
      },
      y: {
        ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10, weight: 'bold' } },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
    },
  };

  return (
    <div className="w-full h-48">
      <Line data={data} options={options} />
    </div>
  );
}
