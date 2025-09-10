import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { paymentId, orderId, amount, currency, timestamp } = await request.json();

    // Create a simple PDF-like receipt using canvas
    const canvas = createCanvas(400, 600);
    const ctx = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 600);

    // Company header with logo area
    ctx.fillStyle = '#8b5cf6'; // Primary purple
    ctx.fillRect(0, 0, 400, 80);
    
    // Company name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('EduMettle', 200, 35);
    
    // Tagline
    ctx.font = '12px Arial';
    ctx.fillText('Empowering Your Learning Journey', 200, 55);

    // Receipt title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('PAYMENT RECEIPT', 200, 120);

    // Receipt details
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    
    const details = [
      { label: 'Receipt No:', value: paymentId },
      { label: 'Order ID:', value: orderId },
      { label: 'Date:', value: new Date(timestamp).toLocaleDateString() },
      { label: 'Time:', value: new Date(timestamp).toLocaleTimeString() },
      { label: 'Course:', value: 'AI Fluency' },
      { label: 'Amount:', value: `₹${amount}` },
      { label: 'Status:', value: 'PAID' },
    ];

    let yPos = 160;
    details.forEach((detail, index) => {
      ctx.fillStyle = '#6b7280';
      ctx.fillText(detail.label, 50, yPos);
      ctx.fillStyle = '#1f2937';
      ctx.fillText(detail.value, 200, yPos);
      yPos += 25;
    });

    // Separator line
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, yPos + 10);
    ctx.lineTo(350, yPos + 10);
    ctx.stroke();

    // Thank you message
    yPos += 40;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Thank You for Your Payment!', 200, yPos);

    yPos += 30;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Your registration has been confirmed.', 200, yPos);
    yPos += 20;
    ctx.fillText('Welcome to EduMettle!', 200, yPos);

    // Contact info
    yPos += 40;
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Contact Information', 200, yPos);
    
    yPos += 25;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Email: hello@edumettle.com', 200, yPos);
    yPos += 20;
    ctx.fillText('Phone: +91 7848843524', 200, yPos);
    yPos += 20;
    ctx.fillText('Website: www.edumettle.com', 200, yPos);

    // Footer
    yPos += 30;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, yPos);
    ctx.lineTo(350, yPos);
    ctx.stroke();

    yPos += 20;
    ctx.font = '10px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('This is a computer-generated receipt.', 200, yPos);
    yPos += 15;
    ctx.fillText('No signature required.', 200, yPos);

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');

    // Create a simple PDF-like response (in a real implementation, you'd use a proper PDF library)
    // For now, we'll return the PNG image
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="EduMettle-Receipt-${paymentId}.png"`,
      },
    });

  } catch (error) {
    console.error('Error generating receipt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate receipt' },
      { status: 500 }
    );
  }
}
