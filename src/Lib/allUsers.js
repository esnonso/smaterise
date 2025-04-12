import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export const getAllUsers = async () => {
  try {
    await connectDatabase();
    const data = await Data.find({});
    const users = data.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      image: d.imgLink,
      activeLoginTimes: d.sessions.length,
    }));
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
    return sortedUsers;
  } catch (err) {
    console.log(err);
  }
};
