import { NextRequest, NextResponse } from 'next/server';
import { addEmployeeToSheet, EmployeeData } from '@/lib/googleSheets';
import { writeFile, mkdir } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const employeeCode = formData.get('employeeCode') as string;
    const name = formData.get('name') as string;
    const designation = formData.get('designation') as string;
    const employeeId = formData.get('employeeId') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const photo = formData.get('photo') as File;

    // Validate required fields
    if (!employeeCode || !name || !designation || !employeeId || !phone || !address || !photo) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!photo.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Photo must be an image file' },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = photo.name.split('.').pop() || 'jpg';
    const photoFilename = `${sanitizedName}.${fileExtension}`;

    // Create employee photos directory if it doesn't exist
    const photosDir = path.join(process.cwd(), 'public', 'employee-photos');
    try {
      await mkdir(photosDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save photo to public directory
    const photoPath = path.join(photosDir, photoFilename);
    const photoBuffer = await photo.arrayBuffer();
    await writeFile(photoPath, Buffer.from(photoBuffer));

    // Prepare employee data
    const employeeData: EmployeeData = {
      employeeCode,
      name,
      designation,
      employeeId,
      phone,
      address,
      photoFilename,
      dateAdded: new Date().toISOString()
    };

    // Add to Google Sheets
    const sheetResult = await addEmployeeToSheet(employeeData);
    
    if (!sheetResult.success) {
      return NextResponse.json(
        { error: 'Failed to save employee data to Google Sheets' },
        { status: 500 }
      );
    }

    // Git operations
    try {
      // Add the photo to git
      await execAsync(`git add public/employee-photos/${photoFilename}`);
      
      // Commit the photo
      await execAsync(`git commit -m "Add employee photo: ${name}"`);
      
      // Push to remote
      await execAsync('git push origin main');
    } catch (gitError) {
      console.error('Git operations failed:', gitError);
      // Don't fail the entire operation if git fails
      // The photo is saved and employee is added to sheets
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Employee added successfully',
        data: {
          employeeCode,
          name,
          photoFilename
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding employee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
