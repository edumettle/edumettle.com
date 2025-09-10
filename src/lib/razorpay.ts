import Razorpay from 'razorpay';

function getRazorpayInstance() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not found in environment variables');
  }
  
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export interface PaymentData {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt: string;
  notes?: Record<string, string>;
}

export async function createPaymentOrder(data: PaymentData) {
  try {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: data.amount * 100, // Razorpay expects amount in paise
      currency: data.currency,
      receipt: data.receipt,
      notes: data.notes,
    });

    return { success: true, order };
  } catch (error) {
    console.error('Error creating payment order:', error);
    return { success: false, error };
  }
}

export async function verifyPayment(paymentId: string, orderId: string, signature: string) {
  try {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + '|' + paymentId)
      .digest('hex');

    if (expectedSignature === signature) {
      return { success: true, verified: true };
    } else {
      return { success: false, verified: false };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, error };
  }
}

export async function getPaymentDetails(paymentId: string) {
  try {
    const razorpay = getRazorpayInstance();
    const payment = await razorpay.payments.fetch(paymentId);
    return { success: true, payment };
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return { success: false, error };
  }
}
