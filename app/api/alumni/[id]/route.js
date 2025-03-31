import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { getAuth } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    await connectDB();

    // Find the alumni by ID
    const alumni = await Alumni.findById(id);
    if (!alumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }

    // Update the alumni profile
    const updatedAlumni = await Alumni.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          email: body.email,
          company: body.company,
          role: body.role,
          batch: body.batch,
          location: body.location,
          industry: body.industry,
          bio: body.bio,
          linkedIn: body.linkedIn,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return NextResponse.json(updatedAlumni, { status: 200 });
  } catch (error) {
    console.error("Error updating alumni:", error);
    return NextResponse.json(
      { error: "Error updating alumni profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    await connectDB();

    // Find and delete the alumni
    const deletedAlumni = await Alumni.findByIdAndDelete(id);
    if (!deletedAlumni) {
      return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Alumni deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json(
      { error: "Error deleting alumni profile" },
      { status: 500 }
    );
  }
} 