import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Alumni from '@/models/Alumni';
import { auth } from '@clerk/nextjs/server';
import fs from 'fs';
import path from 'path';
import { mkdir } from 'fs/promises';

// Force dynamic rendering to ensure auth works correctly
export const dynamic = 'force-dynamic';

export async function POST(request) {
  console.log('POST request received to /api/admin/alumni');
  
  try {
    // Check authentication using auth() from Clerk
    const { userId } = auth();
    console.log('Auth check - userId:', userId);

    if (!userId) {
      console.log('Authentication failed - no userId found');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No user found' },
        { status: 401 }
      );
    }

    console.log('User authenticated with ID:', userId);
    await connectDB();

    // For debugging - get the content type
    const contentType = request.headers.get('content-type') || '';
    console.log('Request content type:', contentType);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.log('Upload directory already exists or could not be created:', error);
    }

    // Get form data
    let formData;
    try {
      formData = await request.formData();
      console.log('Form data keys:', [...formData.keys()]);
    } catch (error) {
      console.error('Error parsing form data:', error);
      return NextResponse.json(
        { success: false, error: 'Error parsing form data', details: error.message },
        { status: 400 }
      );
    }

    // Get form fields
    const name = formData.get('name');
    const email = formData.get('email');
    const role = formData.get('role');
    const company = formData.get('company');
    const batch = formData.get('batch');
    const location = formData.get('location');
    const industry = formData.get('industry');
    const bio = formData.get('bio') || '';
    const linkedIn = formData.get('linkedIn') || '';
    const photo = formData.get('photo');

    // Handle file upload
    let photoUrl = '/placeholder.jpg';
    if (photo && photo instanceof File) {
      const fileName = `${Date.now()}-${photo.name}`;
      const filePath = path.join(uploadDir, fileName);
      
      // Convert file to buffer and save
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);
      
      photoUrl = `/uploads/${fileName}`;
    }

    // Create alumni data object
    const alumniData = {
      name,
      email,
      photoUrl,
      role,
      company,
      batch,
      location,
      industry,
      bio,
      linkedIn,
      userId, // Link to the Clerk user ID
    };

    console.log('Creating alumni with data:', alumniData);

    // Validate required fields
    if (!alumniData.name || !alumniData.email || !alumniData.role || !alumniData.company) {
      console.log('Missing required fields:', alumniData);
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create alumni profile
    const alumni = await Alumni.create(alumniData);

    return NextResponse.json({
      success: true,
      data: alumni,
      message: 'Alumni profile created successfully'
    });
  } catch (error) {
    console.error('Error creating alumni:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create alumni profile', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Check authentication using auth()
    const { userId } = auth();
    console.log('GET request - Auth check - userId:', userId);
    
    if (!userId) {
      console.log('GET request - Authentication failed - no userId found');
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const alumni = await Alumni.find().sort({ createdAt: -1 });
    console.log('GET request - Found alumni count:', alumni.length);

    return NextResponse.json(
      { success: true, data: alumni },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in admin alumni API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 