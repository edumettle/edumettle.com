import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment, getPaymentDetails } from '@/lib/razorpay';
import { updateRegistrationPayment } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, orderId, signature } = body;

    // Validate required fields
    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification data is incomplete' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const verificationResult = await verifyPayment(paymentId, orderId, signature);

    if (!verificationResult.success || !verificationResult.verified) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Get payment details
    const paymentDetails = await getPaymentDetails(paymentId);

    if (!paymentDetails.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch payment details' },
        { status: 500 }
      );
    }

    // Update Google Sheets with payment status
    const updateResult = await updateRegistrationPayment(
      orderId,
      paymentId,
      paymentDetails.payment?.status || 'unknown'
    );

    if (!updateResult.success) {
      console.error('Failed to update payment status in Google Sheets:', updateResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified successfully',
        payment: paymentDetails.payment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
