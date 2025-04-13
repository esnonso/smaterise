import chartOptions from "../Utils/chartOptions";
import LoaderInner from "../Loaders/loader-inner";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function LogoutChart({
  data,
  startDate,
  endDate,
  setLogOutEndDate,
  loading,
}) {
  const date = new Date(endDate);
  const datePickerFormat = date.toISOString().split("T")[0];

  const options = {
    ...chartOptions,
    plugins: {
      title: {
        display: true,
        text:
          "User logouts last 7 days ending " + new Date(endDate).toDateString(),
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
            <label>Change Date</label>
            <input
              type="date"
              style={{ marginLeft: "0.5rem" }}
              onChange={(e) => setLogOutEndDate(e.target.value)}
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
