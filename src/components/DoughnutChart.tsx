import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "left" as const,
    },
  },
};
const DoughnutChart = (props: DounutChartProps) => {
  const { body, labels } = props;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: body,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex-col items-center flex gap-10 w-[70%]">
      <Doughnut data={data} options={options} />
      <div className="text-3xl">
        재구매율 : {Math.round((body[0] / (body[0] + body[1])) * 100)} %
      </div>
    </div>
  );
};

export default DoughnutChart;
