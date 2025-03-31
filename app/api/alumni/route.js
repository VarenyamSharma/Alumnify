import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Alumni from '@/models/Alumni';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const industry = searchParams.get('industry') || '';
    const batch = searchParams.get('batch') || '';
    const location = searchParams.get('location') || '';

    await connectDB();

    // Build query
    let query = {};
    
    // Search across multiple fields
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply filters
    if (industry) query.industry = industry;
    if (batch) query.batch = batch;
    if (location) query.location = location;

    // Get total count for pagination
    const total = await Alumni.countDocuments(query);

    // Get paginated results
    const alumni = await Alumni.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: alumni,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alumni data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const alumni = await Alumni.create(data);
    return NextResponse.json({ success: true, data: alumni });
  } catch (error) {
    console.error('Error creating alumni:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create alumni profile' },
      { status: 500 }
    );
  }
} 