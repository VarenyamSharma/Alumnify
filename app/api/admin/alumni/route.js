import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const industry = url.searchParams.get("industry") || "";
    const batch = url.searchParams.get("year") || "";
    const location = url.searchParams.get("location") || "";
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = 6;

    const filter = {};
    if (search) filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } }
    ];
    if (industry) filter.industry = industry;
    if (batch) filter.batch = batch;
    if (location) filter.location = location;

    const alumni = await db.collection("alumni")
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalAlumni = await db.collection("alumni").countDocuments(filter);
    const totalPages = Math.ceil(totalAlumni / limit);

    return NextResponse.json({ alumni, totalPages });
  } catch (error) {
    console.error("❌ Error fetching alumni:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
