import chartOptions from "../Utils/chartOptions";
import LoaderInner from "../Loaders/loader-inner";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LoginData({ data, endDate, setLoginEndDate, loading }) {
  const date = new Date(endDate);
  const datePickerFormat = date.toISOString().split("T")[0];

  const options = {
    ...chartOptions,
    plugins: {
      title: {
        display: true,
        text:
          "User logins last 7 days ending " + new Date(endDate).toDateString(),
        color: "#666666",
        font: {
          size: 16,
          family: '"Quicksand", sans-serif',
        },
        padding: {
          top: 10,
          bottom: 5,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="container">
      {loading && <LoaderInner />}
      {data && !loading && (
        <>
          <div className="filter-container">
            <label>Change date</label>
            <input
              type="date"
              style={{ marginLeft: "0.5rem" }}
              onChange={(e) => setLoginEndDate(e.target.value)}
              value={datePickerFormat}
              className="date"
            />
          </div>
          <Line data={data} options={options} />{" "}
        </>
      )}
    </div>
  );
}
