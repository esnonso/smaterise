import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";
import { mockUserData } from "@/Components/data";

export const populateDatabase = async () => {
  try {
    await connectDatabase();
    await Data.insertMany(mockUserData);
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
