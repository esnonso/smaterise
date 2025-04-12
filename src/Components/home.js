"use client";
import { useState, useEffect } from "react";
import LoginChart from "./Chart/loginchart";
import LogoutChart from "./Chart/logoutchart";
import ActiveUsersChart from "./Chart/activechart";
import InActiveUsersChart from "./Chart/inactiveChart";
import DonutChart from "./Chart/donutchart";
import BarChart from "./Chart/pageschart";
import Image from "next/image";

const today = new Date();
const { endDay } = getTodayDateRange(today);

export default function HomePage({ count, users }) {
  const [dailyLoginData, setDailyLoginData] = useState("");
  const [loginStartDate, setLoginStartDate] = useState("");
  const [loginEndDate, setLoginEndDate] = useState(endDay);
  const [loading, setLoading] = useState(true);
  const [dailyLogOutData, setDailyLogOutData] = useState("");
  const [logOutEndDate, setLogOutEndDate] = useState(endDay);
  const [logOutStartDate, setLogOutStartDate] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(true);
  const [activeData, setActiveData] = useState("");
  const [activeEndDate, setActiveEndDate] = useState(endDay);
  const [activeStartDate, setActiveStartDate] = useState("");
  const [activeLoading, setActiveLoading] = useState(true);
  const [inactiveData, setInActiveData] = useState("");
  const [inactiveEndDate, setInActiveEndDate] = useState(endDay);
  const [inactiveStartDate, setInActiveStartDate] = useState("");
  const [inactiveLoading, setInActiveLoading] = useState(true);
  const [loginLogOutData, setLoginLogoutData] = useState("");
  const [loginLogOutLoading, setLoginLogoutLoading] = useState(true);
  const [visitedData, setVisitedData] = useState("");
  const [visitedEndDate, setVisitedEndDate] = useState(endDay);
  const [visitedStartDate, setVisitedStartDate] = useState("");
  const [visitedLoading, setVisitedLoading] = useState(true);

  const fetchLoginData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: loginEndDate,
        }),
      });
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();
      // const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const labels = Object.keys(data);
      const values = Object.values(data);
      // const formattedLabel = labels.map(
      //   (l) => l + " " + daysOfWeek[new Date(l).getDay()]
      // );

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Login",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      };
      const { startOfDay } = getTodayDateRange(loginEndDate);
      setDailyLoginData(chartData);
      setLoginEndDate(loginEndDate);
      setLoginStartDate(startOfDay);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const populateDatabase = async () => {
    try {
      const response = await fetch("/api/populate");
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      alert("Succesful!");
    } catch (error) {
      alert("An error occured");
    }
  };

  const fetchLogOutData = async () => {
    try {
      setLogoutLoading(true);
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: logOutEndDate,
        }),
      });
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();
      // const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const labels = Object.keys(data);
      const values = Object.values(data);
      // const formattedLabel = labels.map(
      //   (l) => l + " " + daysOfWeek[new Date(l).getDay()]
      // );

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Logouts",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      };
      const { startOfDay } = getTodayDateRange(logOutEndDate);
      setDailyLogOutData(chartData);
      setLogOutEndDate(logOutEndDate);
      setLogOutStartDate(startOfDay);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const fetchActiveUsersData = async () => {
    try {
      setActiveLoading(true);
      const response = await fetch("/api/active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: activeEndDate,
        }),
      });
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();

      const { startOfDay } = getTodayDateRange(activeEndDate);
      setActiveData(data.splice(0, 3));
      setActiveEndDate(activeEndDate);
      setActiveStartDate(startOfDay);
      setActiveLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setActiveLoading(false);
    }
  };

  const fetchInActiveUsersData = async () => {
    try {
      setInActiveLoading(true);
      const response = await fetch("/api/active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: activeEndDate,
        }),
      });
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();

      const { startOfDay } = getTodayDateRange(inactiveEndDate);
      setInActiveData(data.slice(-3));
      setInActiveEndDate(inactiveEndDate);
      setInActiveStartDate(startOfDay);
      setInActiveLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchLoginLogoutData() {
    try {
      setLoginLogoutLoading(true);
      const response = await fetch("/api/logged");
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();
      setLoginLogoutData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoginLogoutLoading(false);
    }
  }

  const fetchVisitedData = async () => {
    try {
      setVisitedLoading(true);
      const response = await fetch("/api/visited", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: visitedEndDate,
        }),
      });
      if (!response.ok)
        throw new Error(response.statusText || "An error occured");
      const data = await response.json();
      const labels = Object.keys(data);
      const values = Object.values(data);
      const chartData = {
        labels: labels, // X-axis labels
        datasets: [
          {
            label: "Visited Pages", // Dataset label
            data: values, // Data points
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
            borderColor: "rgba(75, 192, 192, 1)", // Border color
            borderWidth: 1, // Border width
          },
        ],
      };

      const { startOfDay } = getTodayDateRange(visitedEndDate);
      setVisitedData(chartData);
      setVisitedEndDate(visitedEndDate);
      setVisitedStartDate(startOfDay);
    } catch (error) {
      console.log(error);
    } finally {
      setVisitedLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginLogoutData();
  }, []);

  useEffect(() => {
    fetchLoginData();
  }, [loginEndDate]);

  useEffect(() => {
    fetchLogOutData();
  }, [logOutEndDate]);

  useEffect(() => {
    fetchActiveUsersData();
  }, [activeEndDate]);

  useEffect(() => {
    fetchInActiveUsersData();
  }, [inactiveEndDate]);

  useEffect(() => {
    fetchVisitedData();
  }, [visitedEndDate]);

  return (
    <div width="100%">
      {count === 0 && (
        <button
          style={{ margin: "1rem 0 0 4rem", padding: "0.7rem 2rem" }}
          onClick={populateDatabase}
        >
          Populate Database
        </button>
      )}

      <div className="home-container">
        <DonutChart data={loginLogOutData} loading={loginLogOutLoading} />

        <BarChart
          data={visitedData}
          startDate={visitedStartDate}
          endDate={visitedEndDate}
          loading={visitedLoading}
          setVisitedEndDate={setVisitedEndDate}
        />

        <LoginChart
          data={dailyLoginData}
          startDate={loginStartDate}
          endDate={loginEndDate}
          loading={loading}
          setLoginEndDate={setLoginEndDate}
        />

        <LogoutChart
          data={dailyLogOutData}
          startDate={logOutStartDate}
          endDate={logOutEndDate}
          loading={logoutLoading}
          setLogOutEndDate={setLogOutEndDate}
        />

        <ActiveUsersChart
          data={activeData}
          startDate={activeStartDate}
          endDate={activeEndDate}
          loading={activeLoading}
          setActiveEndDate={setActiveEndDate}
        />

        <InActiveUsersChart
          data={inactiveData}
          startDate={inactiveStartDate}
          endDate={inactiveEndDate}
          loading={inactiveLoading}
          setInActiveEndDate={setInActiveEndDate}
        />

        <div className="user-container">
          <p>
            <b>All Users</b>
          </p>
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
            <p style={{ width: "50%", textAlign: "right" }}>
              Active Login Sessions
            </p>
          </div>
          {users.map((d) => (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0.5rem",
                borderBottom: "1px solid rgba(75, 192, 192, 0.1)",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
              key={d.id}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Image src={d.image} height="40" width="40" alt="profile-img" />
                <p style={{ marginLeft: "1rem" }}>{d.name}</p>
              </div>
              <p
                style={{
                  width: "50%",
                  textAlign: "right",
                  paddingRight: "4rem",
                }}
              >
                {d.activeLoginTimes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getTodayDateRange(date) {
  const inputDate = new Date(date);

  // Clone the date to avoid mutating it
  const endOfToday = new Date(inputDate);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfSixDaysAgo = new Date(inputDate);
  startOfSixDaysAgo.setDate(startOfSixDaysAgo.getDate() - 6); // 6 days before input
  startOfSixDaysAgo.setHours(0, 0, 0, 0);

  return {
    startOfDay: startOfSixDaysAgo.toISOString(),
    endDay: endOfToday.toISOString(),
  };
}
