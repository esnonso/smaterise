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
  const date = new Date(endDate);
  const datePickerFormat = date.toISOString().split("T")[0];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          "Pages Visited: 7-Day summary ending " +
          new Date(endDate).toDateString(),
        font: {
          size: 16,
          family: '"Quicksand", sans-serif',
        },
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
          <div className="filter-container">
            <label>Change Date</label>
            <input
              type="date"
              style={{ marginLeft: "0.5rem" }}
              onChange={(e) => setVisitedEndDate(e.target.value)}
              value={datePickerFormat}
              className="date"
            />
          </div>
          <Bar data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default BarChart;
