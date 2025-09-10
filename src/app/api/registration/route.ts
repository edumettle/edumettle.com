import { NextRequest, NextResponse } from 'next/server';
import { addRegistrationToSheet, RegistrationFormData } from '@/lib/googleSheets';
import { createPaymentOrder } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, experience, goals, courseId, courseTitle, amount } = body;

    // Validate required fields
    if (!name || !email || !phone || !courseId || !courseTitle) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const registrationData: RegistrationFormData = {
      name,
      email,
      phone,
      experience: experience || '',
      goals: goals || '',
      courseId,
      courseTitle,
      timestamp: new Date().toISOString(),
    };

    // Add to Google Sheets first
    const sheetResult = await addRegistrationToSheet(registrationData);

    if (!sheetResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save registration data' },
        { status: 500 }
      );
    }

    // Create payment order if amount is provided
    if (amount && amount > 0) {
      const paymentData = {
        amount: parseInt(amount),
        currency: 'INR',
        receipt: `receipt_${Date.now()}_${courseId}`,
        notes: {
          courseId,
          courseTitle,
          studentName: name,
          studentEmail: email,
        },
      };

      const paymentResult = await createPaymentOrder(paymentData);

      if (paymentResult.success) {
        return NextResponse.json(
          {
            success: true,
            message: 'Registration submitted successfully',
            paymentOrder: paymentResult.order,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, error: 'Failed to create payment order' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: 'Registration submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
