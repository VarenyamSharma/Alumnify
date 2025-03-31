import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Alumni from "@/models/Alumni";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department');
    const role = searchParams.get('role');

    console.log('API Request - Search params:', { department, role });

    // If no filters are provided, return unique values for dropdowns
    if (!department && !role) {
      const departments = await Alumni.distinct('department');
      const roles = await Alumni.distinct('role');
      
      // Log total count of alumni records
      const totalCount = await Alumni.countDocuments();
      console.log('Total alumni records in database:', totalCount);
      
      console.log('API Response - Dropdown options:', {
        departments: departments.filter(Boolean),
        roles: roles.filter(Boolean)
      });

      return NextResponse.json(
        { 
          success: true, 
          data: {
            departments: departments.filter(Boolean),
            roles: roles.filter(Boolean)
          }
        },
        { status: 200 }
      );
    }

    // If filters are provided, return filtered results
    const query = {};
    if (department && department !== 'all') {
      query.department = department;
    }
    if (role && role !== 'all') {
      query.role = role;
    }

    console.log('API Query:', query);

    // Log the count of matching documents before fetching
    const matchingCount = await Alumni.countDocuments(query);
    console.log('Number of matching documents:', matchingCount);

    const alumni = await Alumni.find(query)
      .select('name department role company photo')
      .sort({ createdAt: -1 });

    console.log('API Response - Found profiles:', alumni.length);
    console.log('Sample of returned profiles:', alumni.slice(0, 3));

    return NextResponse.json(
      { success: true, data: alumni },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in preferences API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 