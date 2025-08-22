"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CompanyDetails } from "@/types/ApplicationTypes";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StockChart(props: { symbol: string; prices: CompanyDetails[] }) {
  if (!props.prices || props.prices.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Price Chart </h2>
        <p className="text-gray-500">No price data available</p>
      </div>
    );
  }

  const formattedLabels = props.prices.map((p) =>
  new Date(p.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
);


  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: `${props.symbol} Price`,
        data: props.prices.map((p) => p.close),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-black">Price Chart</h2>
      <Line data={data} />
    </div>
  );
}
