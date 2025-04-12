"use server";
import { NextResponse } from "next/server";
import { populateDatabase } from "@/Lib/populate";

export async function GET() {
  try {
    await populateDatabase();
    return NextResponse.json("Database Populated");
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured!", error: error.message },
      { status: 500 }
    );
  }
}
