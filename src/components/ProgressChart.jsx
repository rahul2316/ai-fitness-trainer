import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function ProgressChart({ data, type = "weight", title }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-muted text-sm font-bold uppercase tracking-tight">
                No data available
            </div>
        );
    }

    const chartData = {
        labels: data.map(d => d.date || d.week || d.label),
        datasets: [
            {
                label: title || "Progress",
                data: data.map(d => d.value),
                borderColor: "rgb(163, 255, 18)",
                backgroundColor: "rgba(163, 255, 18, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: "rgb(163, 255, 18)",
                pointBorderColor: "#0a0a0a",
                pointBorderWidth: 2,
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
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                titleColor: "rgb(163, 255, 18)",
                bodyColor: "#fff",
                borderColor: "rgba(163, 255, 18, 0.3)",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                titleFont: {
                    size: 12,
                    weight: "bold",
                },
                bodyFont: {
                    size: 14,
                    weight: "bold",
                },
                callbacks: {
                    label: function (context) {
                        let label = context.parsed.y;
                        if (type === "weight") {
                            label += " kg";
                        } else if (type === "calories") {
                            label += " kcal";
                        } else if (type === "volume") {
                            label += " kg";
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                    drawBorder: false,
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.4)",
                    font: {
                        size: 10,
                        weight: "bold",
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                    drawBorder: false,
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.4)",
                    font: {
                        size: 10,
                        weight: "bold",
                    },
                    callback: function (value) {
                        if (type === "weight") {
                            return value + " kg";
                        } else if (type === "calories") {
                            return value + " kcal";
                        }
                        return value;
                    }
                },
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    };

    return (
        <div className="h-64">
            <Line data={chartData} options={options} />
        </div>
    );
}
