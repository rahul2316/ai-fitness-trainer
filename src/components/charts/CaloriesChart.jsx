import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFitness } from "../../context/FitnessContext";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function CaloriesChart() {
  const { calorieHistory } = useFitness();

  const data = {
    labels: calorieHistory.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: "ASSIMILATION",
        data: calorieHistory.map(d => d.intake),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        borderRadius: 12,
        hoverBackgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "DISSIPATION",
        data: calorieHistory.map(d => d.burned),
        backgroundColor: "rgba(245, 158, 11, 0.6)",
        borderColor: "rgba(245, 158, 11, 1)",
        borderWidth: 1,
        borderRadius: 12,
        hoverBackgroundColor: "rgba(245, 158, 11, 0.8)",
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        titleFont: { size: 10, family: 'Inter', weight: 'bold' },
        bodyFont: { size: 14, family: 'Inter', weight: 'black' },
        displayColors: true,
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
      <Bar data={data} options={options} />
    </div>
  );
}
