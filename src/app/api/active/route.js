"use server";
import { NextResponse } from "next/server";
import { getActiveUsers } from "@/Lib/activeData";

export async function POST(req, res) {
  try {
    const { date } = await req.json();
    const data = await getActiveUsers(date);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured!", error: error.message },
      { status: 500 }
    );
  }
}
