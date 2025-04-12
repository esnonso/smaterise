import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export const checkIfDbIsEmpty = async () => {
  try {
    await connectDatabase();
    const count = await Data.countDocuments();
    return count;
  } catch (err) {
    console.log(err);
  }
};
