import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const url = req.nextUrl;

    // Extract query parameters
    const search = url.searchParams.get("search") || "";
    const industry = url.searchParams.get("industry") || "";
    const batch = url.searchParams.get("batch") || "";
    const location = url.searchParams.get("location") || "";
    const page = parseInt(url.searchParams.get("page"), 10) || 1;
    const limit = 6;

    // Construct the filter query
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }
    if (industry) filter.industry = industry;
    if (batch) filter.batch = batch;
    if (location) filter.location = location;

    // Fetch alumni and total count in parallel for better performance
    const [alumni, totalAlumni] = await Promise.all([
      db.collection("alumni")
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      db.collection("alumni").countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalAlumni / limit);

    return NextResponse.json({ success: true, alumni, totalPages });
  } catch (error) {
    console.error("❌ Error fetching alumni:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    
    // Check if the request is multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    
    let data;
    if (contentType.includes("multipart/form-data")) {
      // Handle form data with file upload
      const formData = await req.formData();
      data = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => {
          // Skip file for now, we'll handle it separately
          if (key === "photo" && value instanceof File) {
            return [key, null];
          }
          return [key, value];
        })
      );
      
      // Handle photo file if it exists
      const photoFile = formData.get("photo");
      if (photoFile && photoFile instanceof File) {
        // Here you would typically:
        // 1. Upload the file to a storage service (AWS S3, Cloudinary, etc.)
        // 2. Get the URL and store it in the database
        
        // For now, we'll just store some metadata about the file
        data.photoMeta = {
          filename: photoFile.name,
          type: photoFile.type,
          size: photoFile.size
        };
        
        // TODO: Implement actual file upload and get URL
        // data.photoUrl = "URL from your file storage service";
      }
    } else {
      // Handle JSON request
      data = await req.json();
    }

    // Insert the new alumni record
    const result = await db.collection("alumni").insertOne(data);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("❌ Error adding alumni:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}