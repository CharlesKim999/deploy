import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props: BarChartProps) => {
  const { body, labels, avg } = props;
  const data = {
    labels,
    datasets: [
      {
        label: "고객결제금액 분포표",
        data: body,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-10 items-center w-full h-full justify-center">
      <Bar data={data} />
      <div>고객의 평균 결제금액은 {Math.round(avg)} 원 입니다.</div>
    </div>
  );
};

export default BarChart;
