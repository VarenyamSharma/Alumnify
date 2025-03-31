import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Alumni from '@/models/Alumni';
import Connection from '@/models/Connection';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { alumniId, message } = await request.json();

    // Check if alumni exists
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      return NextResponse.json(
        { success: false, error: 'Alumni not found' },
        { status: 404 }
      );
    }

    // Create connection request
    const connection = await Connection.create({
      userId,
      alumniId,
      message,
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      data: connection,
      message: 'Connection request sent successfully'
    });
  } catch (error) {
    console.error('Error creating connection:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Connection request already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status') || 'accepted';

    // Get total count for pagination
    const total = await Connection.countDocuments({ userId, status });

    // Get paginated connections with alumni details
    const connections = await Connection.find({ userId, status })
      .populate('alumniId')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: connections,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
} 