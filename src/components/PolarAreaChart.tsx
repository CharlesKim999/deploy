import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = (props: PolarAreaChartProps) => {
  const { body, labels } = props;
  if (body.length > 6) {
    body.splice(6, body.length - 6);
    labels.splice(6, labels.length - 6);
  }
  const options = {
    layout: {
      padding: {
        left: 0, // 상단 패딩 추가
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: body,
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <PolarArea data={data} options={options} />;
};
export default PolarAreaChart;
