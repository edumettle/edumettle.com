import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, paymentId, orderId, amount, currency, timestamp } = await request.json();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    // Get fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Set up colors
    const primaryColor = rgb(0.545, 0.361, 0.969); // #8b5cf6
    const textColor = rgb(0.122, 0.161, 0.216); // #1f2937
    const grayColor = rgb(0.420, 0.455, 0.502); // #6b7280
    const lightGrayColor = rgb(0.898, 0.910, 0.922); // #e5e7eb

    // Header background
    page.drawRectangle({
      x: 0,
      y: 520,
      width: 400,
      height: 80,
      color: primaryColor,
    });

    // Company name in header
    page.drawText('EduMettle', {
      x: 200 - (font.widthOfTextAtSize('EduMettle', 24) / 2),
      y: 550,
      size: 24,
      font: boldFont,
      color: rgb(1, 1, 1), // White
    });

    // Tagline in header
    page.drawText('Empowering Your Learning Journey', {
      x: 200 - (font.widthOfTextAtSize('Empowering Your Learning Journey', 12) / 2),
      y: 530,
      size: 12,
      font: font,
      color: rgb(1, 1, 1), // White
    });

    // Receipt title
    page.drawText('PAYMENT RECEIPT', {
      x: 200 - (boldFont.widthOfTextAtSize('PAYMENT RECEIPT', 20) / 2),
      y: 480,
      size: 20,
      font: boldFont,
      color: textColor,
    });

    // Customer Information Section
    page.drawText('CUSTOMER INFORMATION', {
      x: 50,
      y: 440,
      size: 14,
      font: boldFont,
      color: textColor,
    });

    // Customer details
    const customerDetails = [
      { label: 'Name:', value: name || 'N/A' },
      { label: 'Email:', value: email || 'N/A' },
      { label: 'Phone:', value: phone || 'N/A' },
    ];

    let yPos = 410;
    customerDetails.forEach((detail) => {
      page.drawText(detail.label, {
        x: 50,
        y: yPos,
        size: 12,
        font: font,
        color: grayColor,
      });
      
      page.drawText(detail.value, {
        x: 150,
        y: yPos,
        size: 12,
        font: font,
        color: textColor,
      });
      yPos -= 20;
    });

    // Separator line
    page.drawLine({
      start: { x: 50, y: yPos - 10 },
      end: { x: 350, y: yPos - 10 },
      thickness: 1,
      color: lightGrayColor,
    });

    // Payment Information Section
    yPos -= 30;
    page.drawText('PAYMENT INFORMATION', {
      x: 50,
      y: yPos,
      size: 14,
      font: boldFont,
      color: textColor,
    });

    // Payment details
    const paymentDetails = [
      { label: 'Payment ID:', value: paymentId || 'N/A' },
      { label: 'Order ID:', value: orderId || 'N/A' },
      { label: 'Date:', value: new Date(timestamp).toLocaleDateString() },
      { label: 'Time:', value: new Date(timestamp).toLocaleTimeString() },
      { label: 'Course:', value: 'AI Fluency' },
      { label: 'Amount:', value: `Rs. ${amount}` },
      { label: 'Status:', value: 'PAID' },
    ];

    yPos -= 20;
    paymentDetails.forEach((detail) => {
      page.drawText(detail.label, {
        x: 50,
        y: yPos,
        size: 12,
        font: font,
        color: grayColor,
      });
      
      page.drawText(detail.value, {
        x: 200,
        y: yPos,
        size: 12,
        font: font,
        color: textColor,
      });
      yPos -= 20;
    });

    // Separator line
    page.drawLine({
      start: { x: 50, y: yPos - 10 },
      end: { x: 350, y: yPos - 10 },
      thickness: 1,
      color: lightGrayColor,
    });

    // Thank you message
    yPos -= 30;
    page.drawText('Thank You for Your Payment!', {
      x: 200 - (boldFont.widthOfTextAtSize('Thank You for Your Payment!', 16) / 2),
      y: yPos,
      size: 16,
      font: boldFont,
      color: textColor,
    });

    yPos -= 25;
    page.drawText('Your registration has been confirmed.', {
      x: 200 - (font.widthOfTextAtSize('Your registration has been confirmed.', 12) / 2),
      y: yPos,
      size: 12,
      font: font,
      color: grayColor,
    });

    yPos -= 20;
    page.drawText('Welcome to EduMettle!', {
      x: 200 - (font.widthOfTextAtSize('Welcome to EduMettle!', 12) / 2),
      y: yPos,
      size: 12,
      font: font,
      color: grayColor,
    });

    // Contact Information
    yPos -= 40;
    page.drawText('Contact Information', {
      x: 200 - (boldFont.widthOfTextAtSize('Contact Information', 14) / 2),
      y: yPos,
      size: 14,
      font: boldFont,
      color: textColor,
    });

    const contactInfo = [
      'Email: hello@edumettle.com',
      'Phone: +91 7848843524',
      'Website: www.edumettle.com',
      'Location: Rourkela, Odisha, India',
    ];

    yPos -= 20;
    contactInfo.forEach((info) => {
      page.drawText(info, {
        x: 200 - (font.widthOfTextAtSize(info, 12) / 2),
        y: yPos,
        size: 12,
        font: font,
        color: grayColor,
      });
      yPos -= 18;
    });

    // Footer separator
    page.drawLine({
      start: { x: 50, y: yPos - 10 },
      end: { x: 350, y: yPos - 10 },
      thickness: 1,
      color: lightGrayColor,
    });

    // Footer text
    yPos -= 20;
    page.drawText('This is a computer-generated receipt.', {
      x: 200 - (font.widthOfTextAtSize('This is a computer-generated receipt.', 10) / 2),
      y: yPos,
      size: 10,
      font: font,
      color: rgb(0.612, 0.639, 0.686), // #9ca3af
    });

    yPos -= 15;
    page.drawText('No signature required.', {
      x: 200 - (font.widthOfTextAtSize('No signature required.', 10) / 2),
      y: yPos,
      size: 10,
      font: font,
      color: rgb(0.612, 0.639, 0.686), // #9ca3af
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF
    return new NextResponse(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="EduMettle-Receipt-${paymentId}.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
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