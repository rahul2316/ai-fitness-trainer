import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { useFitness } from "../../context/FitnessContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MacrosChart() {
    const { calorieHistory } = useFitness();

    // Get latest macros or default
    const latestData = calorieHistory?.length > 0
        ? calorieHistory[calorieHistory.length - 1]
        : { protein: 30, carbs: 40, fats: 30 }; // Mock ratios if no data

    const data = {
        labels: ["Protein", "Carbs", "Fats"],
        datasets: [
            {
                data: [
                    latestData.protein || 30,
                    latestData.carbs || 40,
                    latestData.fats || 30
                ],
                backgroundColor: [
                    "rgba(16, 185, 129, 0.8)", // Emerald (Protein)
                    "rgba(59, 130, 246, 0.8)", // Blue (Carbs)
                    "rgba(245, 158, 11, 0.8)", // Amber (Fats)
                ],
                borderColor: [
                    "rgba(16, 185, 129, 1)",
                    "rgba(59, 130, 246, 1)",
                    "rgba(245, 158, 11, 1)",
                ],
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: { size: 12, weight: "bold" },
                bodyFont: { size: 12 },
                padding: 12,
                displayColors: false,
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="relative w-full h-48">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Ratios</p>
                <p className="text-xl font-black text-white italic">MACROS</p>
            </div>
        </div>
    );
}
