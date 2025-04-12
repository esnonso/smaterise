import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export const getNoOfPagesVisited = async (date) => {
  try {
    console.log(date);
    const { startOfDay, endDay } = getTodayDateRange(date);
    console.log(startOfDay, endDay);
    await connectDatabase();
    const users = await Data.aggregate([
      {
        $unwind: "$sessions", // Unwind the sessions array so each session becomes a document
      },
      {
        $match: {
          "sessions.login": { $gte: startOfDay, $lt: endDay }, // Match sessions within the date range
        },
      },
      {
        $group: {
          _id: "$_id", // Group by the user's ID
          sessions: { $push: "$sessions" }, // Collect the matching sessions back into an array
        },
      },
    ]);

    const pagesVisited = users
      .map((u) => u.sessions.map((s) => s.pagesVisited))
      .flat()
      .flat();

    const counter = {};
    for (let val of pagesVisited) {
      counter[val] = (counter[val] || 0) + 1;
    }
    return counter;
  } catch (err) {
    console.log(err);
  }
};

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
