"use client";
import { useState, useEffect } from "react";
import LoginChart from "./Chart/loginchart";
import LogoutChart from "./Chart/logoutchart";
import ActiveUsersChart from "./Chart/activechart";
import InActiveUsersChart from "./Chart/inactiveChart";
import DonutChart from "./Chart/donutchart";
import BarChart from "./Chart/pageschart";
import AllUsers from "./Chart/allUsers";

const today = new Date();

export default function HomePage({ count, users }) {
  const [dailyLoginData, setDailyLoginData] = useState("");
  const [loginEndDate, setLoginEndDate] = useState(today);
  const [loading, setLoading] = useState(true);
  const [dailyLogOutData, setDailyLogOutData] = useState("");
  const [logOutEndDate, setLogOutEndDate] = useState(today);
  const [logoutLoading, setLogoutLoading] = useState(true);
  const [activeData, setActiveData] = useState("");
  const [activeEndDate, setActiveEndDate] = useState(today);
  const [activeLoading, setActiveLoading] = useState(true);
  const [inactiveData, setInActiveData] = useState("");
  const [inactiveEndDate, setInActiveEndDate] = useState(today);
  const [inactiveLoading, setInActiveLoading] = useState(true);
  const [loginLogOutData, setLoginLogoutData] = useState("");
  const [loginLogOutLoading, setLoginLogoutLoading] = useState(true);
  const [visitedData, setVisitedData] = useState("");
  const [visitedEndDate, setVisitedEndDate] = useState(today);
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
            label: "No of users",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setDailyLoginData(chartData);
      setLoginEndDate(loginEndDate);
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
            label: "No of users",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setDailyLogOutData(chartData);
      setLogOutEndDate(logOutEndDate);
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

      setActiveData(data.splice(0, 3));
      setActiveEndDate(activeEndDate);
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

      setInActiveData(data.slice(-3));
      setInActiveEndDate(inactiveEndDate);
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
            label: "No of times visited", // Dataset label
            data: values, // Data points
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
            borderColor: "rgba(75, 192, 192, 1)", // Border color
            borderWidth: 1, // Border width
          },
        ],
      };

      setVisitedData(chartData);
      setVisitedEndDate(visitedEndDate);
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
          endDate={visitedEndDate}
          loading={visitedLoading}
          setVisitedEndDate={setVisitedEndDate}
        />

        <LoginChart
          data={dailyLoginData}
          endDate={loginEndDate}
          loading={loading}
          setLoginEndDate={setLoginEndDate}
        />

        <LogoutChart
          data={dailyLogOutData}
          endDate={logOutEndDate}
          loading={logoutLoading}
          setLogOutEndDate={setLogOutEndDate}
        />

        <ActiveUsersChart
          data={activeData}
          endDate={activeEndDate}
          loading={activeLoading}
          setActiveEndDate={setActiveEndDate}
        />

        <InActiveUsersChart
          data={inactiveData}
          endDate={inactiveEndDate}
          loading={inactiveLoading}
          setInActiveEndDate={setInActiveEndDate}
        />

        <AllUsers users={users} />
      </div>
    </div>
  );
}
