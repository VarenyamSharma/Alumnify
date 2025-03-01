// app/api/admin/alumni/route.js
import { NextResponse } from "next/server";
import Alumni from "@/models/Alumni";

export async function GET(request) {
  try {
    // Get the search parameters from the URL
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters with defaults
    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") || "";
    const batch = searchParams.get("batch") || "";
    const location = searchParams.get("location") || "";
    const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
    const limit = 6; // Matches the frontend grid layout (2x3)

    // Build the filter query
    const filter = {};

    // Add search filter if search term exists
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    // Add other filters if they exist
    if (industry) filter.industry = industry;
    if (batch) filter.batch = batch;
    if (location) filter.location = location;

    // Log the query for debugging
    console.log("🔍 Query filters:", filter);

    try {
      // Execute the query and count in parallel
      const [alumni, totalAlumni] = await Promise.all([
        Alumni.find(filter)
          .select('name email photoUrl role company batch location industry bio linkedIn createdAt')
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 }) // Sort by newest first
          .lean(), // Convert to plain JS objects for better performance
        Alumni.countDocuments(filter)
      ]);

      // Calculate total pages
      const totalPages = Math.ceil(totalAlumni / limit);

      // Log the results for debugging
      console.log(`📊 Found ${alumni.length} alumni (page ${page} of ${totalPages})`);

      // Return the response in the exact format expected by the frontend
      return NextResponse.json({
        success: true,
        alumni,
        totalPages,
        currentPage: page,
        totalAlumni
      });

    } catch (queryError) {
      console.error("Query execution error:", queryError);
      throw queryError;
    }

  } catch (error) {
    console.error("API Error:", error);
    
    // Handle different types of errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid input data",
          details: Object.values(error.errors).map(err => err.message)
        },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch alumni",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}