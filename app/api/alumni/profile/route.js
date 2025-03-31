import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Find the alumni profile using the Clerk userId
    let alumni = await Alumni.findOne({ userId });

    // If no profile exists, create one with basic information
    if (!alumni) {
      const user = await auth();
      alumni = await Alumni.create({
        userId,
        name: user.user?.fullName || "Anonymous",
        email: user.user?.emailAddresses[0]?.emailAddress || "",
        department: "",
        role: "",
        company: "",
        phone: "",
        location: "",
        bio: "",
        skills: "",
        experience: "",
        photoUrl: user.user?.imageUrl || ""
      });
    }

    // Return the profile data
    return NextResponse.json(
      { 
        success: true, 
        data: {
          name: alumni.name,
          email: alumni.email,
          department: alumni.department,
          role: alumni.role,
          company: alumni.company,
          phone: alumni.phone,
          location: alumni.location,
          bio: alumni.bio,
          skills: alumni.skills,
          experience: alumni.experience,
          photoUrl: alumni.photoUrl
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      department, 
      role, 
      company, 
      phone, 
      location,
      bio,
      skills,
      experience
    } = body;

    await connectDB();

    // Find and update the alumni profile
    const alumni = await Alumni.findOneAndUpdate(
      { userId },
      { 
        department,
        role,
        company,
        phone,
        location,
        bio,
        skills,
        experience
      },
      { new: true, runValidators: true, upsert: true }
    );

    return NextResponse.json(
      { 
        success: true, 
        data: {
          name: alumni.name,
          email: alumni.email,
          department: alumni.department,
          role: alumni.role,
          company: alumni.company,
          phone: alumni.phone,
          location: alumni.location,
          bio: alumni.bio,
          skills: alumni.skills,
          experience: alumni.experience,
          photoUrl: alumni.photoUrl
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 