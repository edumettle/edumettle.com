import { NextRequest, NextResponse } from 'next/server';
import { addContactToSheet, ContactFormData } from '@/lib/googleSheets';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Prepare data for Google Sheets
    const contactData: ContactFormData = {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    };

    // Add to Google Sheets
    const result = await addContactToSheet(contactData);

    if (result.success) {
      // Send email copy to user
      try {
        await sendContactFormCopy(name, email, phone, message);
        console.log('Contact form email sent successfully to:', email);
      } catch (emailError) {
        console.error('Failed to send contact form copy:', emailError);
        // Don't fail the entire request if email fails
      }

      return NextResponse.json(
        { success: true, message: 'Contact form submitted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to submit contact form' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendContactFormCopy(name: string, email: string, phone: string, message: string) {
  // Check if credentials are available
  if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
    console.error('Zoho Mail credentials are not set in environment variables.');
    throw new Error('Email service not configured');
  }

  // Create transporter for Zoho Mail with working configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in', // Use smtp.zoho.in instead of smtp.zoho.com
    port: 465, // Use port 465 for SSL
    secure: true, // Use SSL
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  // Email template
  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission - EduMettle</title>
      <style>
          body {
              font-family: 'Inter', Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background-color: #f9fafb;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              position: relative;
          }
          .logo-text {
              font-size: 32px;
              font-weight: bold;
              color: white;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          .tagline {
              font-size: 14px;
              opacity: 0.9;
              color: white;
          }
          .content {
              padding: 40px 30px;
          }
          .greeting {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 20px;
          }
          .message {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 30px;
          }
          .details-card {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 25px;
              margin: 30px 0;
          }
          .detail-row {
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px solid #e2e8f0;
          }
          .detail-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
          }
          .detail-label {
              font-weight: 600;
              color: #374151;
              display: block;
              margin-bottom: 5px;
          }
          .detail-value {
              color: #1f2937;
              background-color: #ffffff;
              padding: 10px;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
          }
          .message-content {
              background-color: #ffffff;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
              white-space: pre-wrap;
              font-family: inherit;
          }
          .footer {
              background-color: #f8fafc;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
          }
          .contact-info {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 15px;
          }
          .social-links {
              margin-top: 20px;
          }
          .social-links a {
              color: #8b5cf6;
              text-decoration: none;
              margin: 0 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo-text">EduMettle</div>
              <div class="tagline">Empowering Your Learning Journey</div>
          </div>
          
          <div class="content">
              <div class="greeting">Thank you for contacting us, ${name}!</div>
              
              <div class="message">
                  We have received your message and will get back to you within 24 hours. Here's a copy of your submission:
              </div>
              
              <div class="details-card">
                  <div class="detail-row">
                      <span class="detail-label">Name:</span>
                      <span class="detail-value">${name}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Email:</span>
                      <span class="detail-value">${email}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Phone:</span>
                      <span class="detail-value">${phone}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Message:</span>
                      <div class="message-content">${message}</div>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Submitted on:</span>
                      <span class="detail-value">${new Date().toLocaleString()}</span>
                  </div>
              </div>
              
              <div style="background-color: #f0f9ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                  <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">What's Next?</h3>
                  <p style="margin: 0; color: #1f2937;">Our team will review your message and respond to you within 24 hours. If you have any urgent queries, feel free to reach out to us directly.</p>
              </div>
          </div>
          
          <div class="footer">
              <div class="contact-info">
                  <strong>Need Immediate Assistance?</strong><br>
                  Email: hello@edumettle.com<br>
                  Phone: +91 7848843524<br>
                  WhatsApp: +91 7848843524<br>
                  Location: Rourkela, Odisha, India
              </div>
              
              <div class="social-links">
                  <a href="https://www.linkedin.com/company/edumettle">LinkedIn</a>
                  <a href="https://x.com/edumettle">Twitter</a>
                  <a href="http://instagram.com/edumettle">Instagram</a>
                  <a href="https://www.youtube.com/@edumettlecs">YouTube</a>
              </div>
              
              <div style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                  © 2025 EduMettle. All rights reserved.
              </div>
          </div>
      </div>
  </body>
  </html>
  `;

  // Send email
  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: email,
    subject: 'Thank you for contacting EduMettle - Message Received',
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
}