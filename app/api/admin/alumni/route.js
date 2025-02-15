import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";

// ✅ Handle GET request to fetch alumni with search, filters & pagination
export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const { search, industry, year, location, page = 1 } = Object.fromEntries(new URL(req.url).searchParams);

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }
    if (industry) query.industry = industry;
    if (year) query.batch = Number(year);
    if (location) query.location = location;

    const pageSize = 10;
    const alumni = await db.collection("alumni")
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalAlumni = await db.collection("alumni").countDocuments(query);
    const totalPages = Math.ceil(totalAlumni / pageSize);

    return NextResponse.json({ alumni, totalPages });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch alumni" }, { status: 500 });
  }
}

// ✅ Handle POST request to add alumni
export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    const formData = await req.formData();

    // Convert FormData to regular object
    const data = {};
    formData.forEach((value, key) => {
      if (key !== "photo") {
        data[key] = value;
      }
    });

    // Handle photo file
    const photo = formData.get("photo");
    if (photo) {
      data.photoUrl = "placeholder-photo-url";
    }

    const result = await db.collection("alumni").insertOne(data);

    return NextResponse.json({
      success: true,
      data: {
        id: result.insertedId,
        ...data,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
