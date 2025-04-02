import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Alumni from '@/models/Alumni';
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department') || '';
    const role = searchParams.get('role') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 4;

    await connectDB();

    // Build query for matching profiles
    const query = {
      $or: [
        { department: { $regex: department, $options: 'i' } },
        { role: { $regex: role, $options: 'i' } }
      ]
    };

    // Get total count for pagination
    const total = await Alumni.countDocuments(query);

    // Get paginated results
    const matchedProfiles = await Alumni.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: matchedProfiles,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error matching profiles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to match profiles' },
      { status: 500 }
    );
  }
} 