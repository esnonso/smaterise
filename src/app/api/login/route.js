"use server";
import { NextResponse } from "next/server";
import { getNoOfUsersLoggedInDaily } from "@/Lib/LoginData";

export async function POST(req, res) {
  try {
    const { date } = await req.json();
    const data = await getNoOfUsersLoggedInDaily(date);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured!", error: error.message },
      { status: 500 }
    );
  }
}
