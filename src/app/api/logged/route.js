"use server";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/Mongodb";
import Data from "@/Mongodb/Models/data";

export async function GET(req, res) {
  try {
    await connectDatabase();
    const users = await Data.aggregate([
      {
        $unwind: "$sessions", // Unwind sessions array
      },
      {
        $sort: {
          "sessions.login": 1, // Sort sessions chronologically (ascending)
        },
      },
      {
        $group: {
          _id: "$_id", // Group by user ID
          lastSession: { $last: "$sessions" }, // Take the last session after sorting
        },
      },
    ]);
    console.log(users);
    const counter = { active: 0, inactive: 0 };
    for (let val of users) {
      if (val.lastSession.login && val.lastSession.logout) {
        counter.inactive = counter.inactive + 1;
      } else {
        counter.active = counter.active + 1;
      }
    }

    return NextResponse.json(counter);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occured!", error: error.message },
      { status: 500 }
    );
  }
}
