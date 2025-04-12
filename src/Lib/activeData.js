import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export const getActiveUsers = async (date) => {
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
          imgLink: { $first: "$imgLink" },
          name: { $first: "$name" },
          sessions: { $push: "$sessions" }, // Collect the matching sessions back into an array
        },
      },
    ]);

    const rankedUsers = users.map((user) => {
      // Calculate total time spent for all sessions
      const totalTime = user.sessions.reduce((sum, session) => {
        const login = new Date(session.login).getTime();
        const logout = new Date(session.logout).getTime();

        // Only count valid sessions with both login and logout
        if (!isNaN(login) && !isNaN(logout)) {
          return sum + (logout - login);
        }

        return sum;
      }, 0);

      return {
        _id: user._id,
        name: user.name,
        imgLink: user.imgLink,
        totalTime,
        sessions: user.sessions,
      };
    });

    const sortedUsers = rankedUsers.sort((a, b) => b.totalTime - a.totalTime);
    return sortedUsers;
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
