import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "left" as const,
    },
  },
};

const LineChart = (props: LineChartProps) => {
  const { body, labels } = props;
  const data = {
    labels, // x축
    datasets: [
      {
        label: "Dataset",
        data: body,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Line data={data} options={options} />
      <div></div>
    </div>
  );
};

export default LineChart;
