"use server";
import { NextResponse } from "next/server";
import { getNoOfUsersLoggedOutDaily } from "@/Lib/logoutData";

export async function POST(req, res) {
  try {
    const { date } = await req.json();
    const data = await getNoOfUsersLoggedOutDaily(date);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured!", error: error.message },
      { status: 500 }
    );
  }
}
