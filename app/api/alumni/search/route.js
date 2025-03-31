import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const department = searchParams.get("department");

    if (!role || !department) {
      return NextResponse.json(
        { error: "Role and department are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const matchedProfiles = await Alumni.find({
      role: { $regex: role, $options: "i" },
      department: { $regex: department, $options: "i" },
    });

    return NextResponse.json({
      success: true,
      data: matchedProfiles,
    });
  } catch (error) {
    console.error("Error searching alumni:", error);
    return NextResponse.json(
      { error: "Error searching alumni profiles" },
      { status: 500 }
    );
  }
} 