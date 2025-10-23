import { NextRequest, NextResponse } from 'next/server';
import { addEmployeeToSheet, EmployeeData } from '@/lib/googleSheets';
import { writeFile, mkdir } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { employeeCode, name, designation, employeeId, phone, address, photoData, photoName } = body;

    // Validate required fields
    if (!employeeCode || !name || !designation || !employeeId || !phone || !address || !photoData || !photoName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = photoName.split('.').pop() || 'jpg';
    const photoFilename = `${sanitizedName}.${fileExtension}`;

    // Create employee photos directory if it doesn't exist
    const photosDir = path.join(process.cwd(), 'public', 'employee-photos');
    try {
      await mkdir(photosDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save photo to public directory (convert base64 to buffer)
    const photoPath = path.join(photosDir, photoFilename);
    
    // Validate base64 data
    if (!photoData || typeof photoData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid photo data' },
        { status: 400 }
      );
    }

    // Clean base64 data (remove data URL prefix if present)
    const cleanBase64 = photoData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    try {
      const photoBuffer = Buffer.from(cleanBase64, 'base64');
      
      // Validate buffer size (max 5MB)
      if (photoBuffer.length > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Photo file too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
      
      // Validate it's actually an image by checking magic bytes
      const isValidImage = photoBuffer.length > 4 && (
        photoBuffer[0] === 0xFF && photoBuffer[1] === 0xD8 && photoBuffer[2] === 0xFF || // JPEG
        photoBuffer[0] === 0x89 && photoBuffer[1] === 0x50 && photoBuffer[2] === 0x4E && photoBuffer[3] === 0x47 || // PNG
        photoBuffer[0] === 0x47 && photoBuffer[1] === 0x49 && photoBuffer[2] === 0x46 // GIF
      );
      
      if (!isValidImage) {
        return NextResponse.json(
          { error: 'Invalid image format. Please upload a valid JPEG, PNG, or GIF image.' },
          { status: 400 }
        );
      }
      
      await writeFile(photoPath, photoBuffer);
    } catch (error) {
      console.error('Error saving photo:', error);
      return NextResponse.json(
        { error: 'Failed to save photo' },
        { status: 500 }
      );
    }

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
      
      // Commit only the photo file (not other changes)
      await execAsync(`git commit -m "Add employee photo: ${name}" -- public/employee-photos/${photoFilename}`);
      
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
