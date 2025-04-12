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

export default function LoginData({
  data,
  startDate,
  endDate,
  setLoginEndDate,
  loading,
}) {
  return (
    <div className="container">
      {loading && <LoaderInner />}
      {data && !loading && (
        <>
          <p>
            <b>
              Users Login last 7 days starting{" "}
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
              onChange={(e) => setLoginEndDate(e.target.value)}
            />
          </div>
          <Line data={data} options={chartOptions} />{" "}
        </>
      )}
    </div>
  );
}
