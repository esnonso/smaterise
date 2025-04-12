import LoaderInner from "../Loaders/loader-inner";
import Image from "next/image";

export default function ActiveUsersChart({
  loading,
  data,
  startDate,
  endDate,
  setActiveEndDate,
}) {
  const date = new Date(endDate);
  const datePickerFormat = date.toISOString().split("T")[0];
  return (
    <div className="container">
      {loading && <LoaderInner />}
      {data && !loading && (
        <>
          <p>
            <b>
              Most Active Users Last 7 days starting{" "}
              {new Date(startDate).toDateString()} To{" "}
              {new Date(endDate).toDateString()}
            </b>
          </p>
          <div className="filter-container">
            <label>Select Date</label>
            <input
              type="date"
              style={{ marginLeft: "0.5rem" }}
              onChange={(e) => setActiveEndDate(e.target.value)}
              value={datePickerFormat}
              className="date"
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              marginTop: "1rem",
              padding: "0 1rem",
            }}
          >
            <p style={{ width: "50%", textAlign: "left" }}>Name</p>
            <p style={{ width: "50%" }}>Total Hours</p>
          </div>

          {data.map((d) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0.5rem",
                borderBottom: "1px solid rgba(75, 192, 192, 0.1)",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
              key={d._id}
            >
              <div
                style={{ width: "50%", display: "flex", alignItems: "center" }}
              >
                <Image
                  src={d.imgLink}
                  height="40"
                  width="40"
                  alt="profile-img"
                />
                <p style={{ marginLeft: "1rem" }}>{d.name}</p>
              </div>
              <p style={{ width: "50%" }}>{d.totalTime}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
