import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoaderInner from "../Loaders/loader-inner";

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, startDate, endDate, loading, setVisitedEndDate }) => {
  // Data for the chart
  // const data = {
  //   labels: ["January", "February", "March", "April", "May"], // X-axis labels
  //   datasets: [
  //     {
  //       label: "Visited Pages", // Dataset label
  //       data: [12, 19, 3, 5, 2], // Data points
  //       backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
  //       borderColor: "rgba(75, 192, 192, 1)", // Border color
  //       borderWidth: 1, // Border width
  //     },
  //   ],
  // };

  // Options for customizing the chart
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true, // Display chart title
        text: "Pages Visited Data", // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts at zero
      },
    },
  };

  return (
    <div className="container">
      {loading && <LoaderInner />}
      {data && !loading && (
        <>
          <p>
            <b>
              Pages visited last 7 days starting{" "}
              {new Date(startDate).toDateString()} To{" "}
              {new Date(endDate).toDateString()}
            </b>{" "}
          </p>
          <div className="filter-container">
            <label>Select Date</label>
            <input
              type="date"
              style={{
                marginLeft: "0.5rem",
                appearance: "none",
                WebkitAppearance: "none",
              }}
              onChange={(e) => setVisitedEndDate(e.target.value)}
            />
          </div>
          <Bar data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default BarChart;
