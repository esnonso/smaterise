import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export const getNoOfUsersLoggedOutDaily = async (date) => {
  try {
    const { startOfDay, endDay } = getTodayDateRange(date);

    await connectDatabase();
    const users = await Data.aggregate([
      {
        $unwind: "$sessions", // Unwind the sessions array so each session becomes a document
      },
      {
        $match: {
          "sessions.logout": { $gte: startOfDay, $lt: endDay }, // Match sessions within the date range
        },
      },
      {
        $group: {
          _id: "$_id", // Group by the user's ID
          sessions: { $push: "$sessions" }, // Collect the matching sessions back into an array
        },
      },
    ]);

    const allSessions = users.map((u) => u.sessions).flat();
    const counter = {};
    for (let session of allSessions) {
      const val = session.login.split("T")[0];
      counter[val] = (counter[val] || 0) + 1;
    }
    return counter;
  } catch (err) {
    console.log(err);
  }
};

export function getTodayDateRange(date) {
  const today = new Date(date);
  const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Set to 00:00:00 of today

  const startOfLastSevenDays = new Date(today);
  startOfLastSevenDays.setDate(today.getDate() - 6); // Add 6 days
  startOfLastSevenDays.setHours(0, 0, 0, 0);

  const start = startOfLastSevenDays.toISOString();

  return { startOfDay: start, endDay: endOfToday };
}
