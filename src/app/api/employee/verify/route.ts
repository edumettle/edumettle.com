import { NextRequest, NextResponse } from 'next/server';
import { getEmployeeByCode } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Employee code is required' },
        { status: 400 }
      );
    }

    const result = await getEmployeeByCode(code);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Employee not found' },
        { status: 404 }
      );
    }

    // Construct photo URL using API route
    const employee = {
      ...result.data,
      photoUrl: `/api/employee-photo/${result.data?.photoFilename || 'default.jpg'}`
    };

    return NextResponse.json(
      { success: true, data: employee },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying employee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
