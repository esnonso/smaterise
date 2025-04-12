// DonutChart.js
import { Doughnut } from "react-chartjs-2";
import LoaderInner from "../Loaders/loader-inner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ loading, data }) => {
  const chartData = {
    labels: ["Active users", "Inactive users"],
    datasets: [
      {
        label: "Votes",
        data: [data.active, data.inactive],
        backgroundColor: ["#072E5C", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%", // This makes it a donut
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {loading && <LoaderInner />}
      {data && <Doughnut data={chartData} options={options} />}
    </div>
  );
};

export default DonutChart;
