import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Alumni from "@/models/Alumni";

export async function GET() {
  try {
    await connectDB();
    
    // Get total count of alumni
    const totalCount = await Alumni.countDocuments();
    console.log('Total alumni count:', totalCount);
    
    // Get a sample of alumni
    const sampleAlumni = await Alumni.find().limit(5);
    console.log('Sample alumni:', sampleAlumni);

    return NextResponse.json({
      success: true,
      data: {
        totalCount,
        sampleAlumni
      }
    });
  } catch (error) {
    console.error("Error in test endpoint:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 