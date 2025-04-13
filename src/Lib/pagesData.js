import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";
import { getTodayDateRange } from "./dateRange";

export const getNoOfPagesVisited = async (date) => {
  try {
    const { startOfDay, endDay } = getTodayDateRange(date);
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
