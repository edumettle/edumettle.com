import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
    
    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }
    
    // Construct the file path
    const filePath = join(process.cwd(), 'public', 'employee-photos', filename);
    
    // Read the file
    const fileBuffer = await readFile(filePath);
    
    // Determine content type based on file extension
    let contentType = 'image/jpeg'; // default
    if (filename.toLowerCase().endsWith('.png')) {
      contentType = 'image/png';
    } else if (filename.toLowerCase().endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (filename.toLowerCase().endsWith('.webp')) {
      contentType = 'image/webp';
    }
    
    // Return the image with appropriate headers
    return new NextResponse(fileBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error serving employee photo:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}
