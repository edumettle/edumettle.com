import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, paymentId, orderId, amount } = await request.json();

    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email service not configured' 
      }, { status: 500 });
    }

    // Create transporter for Zoho Mail with working configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // Send confirmation email to user
    await sendUserConfirmationEmail(transporter, { name, email, paymentId, orderId, amount });
    
    // Send notification email to support team
    await sendSupportNotificationEmail(transporter, { name, email, paymentId, orderId, amount });

    return NextResponse.json({ success: true, message: 'Confirmation emails sent successfully' });

  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send confirmation emails' },
      { status: 500 }
    );
  }
}

async function sendUserConfirmationEmail(transporter: any, { name, email, paymentId, orderId, amount }: any) {
  // Email template for user
  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to EduMettle!</title>
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
                padding: 0;
                text-align: center;
                position: relative;
                min-height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .logo {
                width: 100%;
                max-width: 400px;
                height: auto;
                object-fit: contain;
                display: block;
                margin: 0 auto;
            }
          .content {
              padding: 40px 30px;
              text-align: center;
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
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
          }
          .detail-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
          }
          .detail-label {
              font-weight: 600;
              color: #374151;
          }
          .detail-value {
              color: #1f2937;
          }
          .next-steps {
              background-color: #f0f9ff;
              border-left: 4px solid #8b5cf6;
              padding: 20px;
              margin: 30px 0;
              border-radius: 0 8px 8px 0;
              text-align: left;
          }
          .next-steps h3 {
              color: #1e40af;
              margin-top: 0;
              margin-bottom: 15px;
          }
          .step {
              margin-bottom: 12px;
              display: flex;
              align-items: flex-start;
          }
          .step-number {
              background-color: #8b5cf6;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
              margin-right: 12px;
              flex-shrink: 0;
          }
          .step-content h4 {
              margin: 0 0 4px 0;
              color: #1f2937;
              font-size: 14px;
          }
          .step-content p {
              margin: 0;
              color: #6b7280;
              font-size: 13px;
          }
          .whatsapp-notice {
              background-color: #dcfce7;
              border: 1px solid #22c55e;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: left;
          }
          .whatsapp-notice h4 {
              color: #15803d;
              margin-top: 0;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
          }
          .whatsapp-notice p {
              color: #166534;
              margin: 0;
              font-size: 14px;
          }
          .cta-button {
              display: inline-block;
              background-color: #8b5cf6;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
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
              <img src="https://raw.githubusercontent.com/edumettle/edumettle.com/refs/heads/main/public/logo%2B%20whitetext_transparent_background.png" alt="EduMettle Logo" class="logo" />
          </div>
          
          <div class="content">
              <div class="greeting">Welcome to EduMettle, ${name}!</div>
              
              <div class="message">
                  Congratulations! Your payment has been successfully processed and your registration for the AI Fluency course is now confirmed. We're excited to have you join our learning community.
              </div>
              
              <div class="details-card">
                  <div class="detail-row">
                      <span class="detail-label">Course:</span>
                      <span class="detail-value">AI Fluency</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Payment ID:</span>
                      <span class="detail-value">${paymentId}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Order ID:</span>
                      <span class="detail-value">${orderId}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Amount Paid:</span>
                      <span class="detail-value">Rs. ${amount}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Status:</span>
                      <span class="detail-value" style="color: #059669; font-weight: 600;">✓ Confirmed</span>
                  </div>
              </div>
              
              <div class="whatsapp-notice">
                  <h4>📱 WhatsApp Group & Further Updates</h4>
                  <p>You will be added to our exclusive WhatsApp group for this course within 24 hours. Additionally, you'll receive several follow-up emails with:</p>
                  <ul style="margin: 10px 0; padding-left: 20px; color: #166534;">
                      <li>Course access details and login credentials</li>
                      <li>Pre-course preparation materials</li>
                      <li>Session schedule and important dates</li>
                      <li>Technical requirements and setup guide</li>
                      <li>Welcome message from your instructor, Abhisek Ganguly</li>
                  </ul>
                  <p><strong>Please check your email regularly and keep an eye on your WhatsApp for the group invitation!</strong></p>
              </div>
              
              <div class="next-steps">
                  <h3>What's Next?</h3>
                  <div class="step">
                      <div class="step-number">1</div>
                      <div class="step-content">
                          <h4>Check Your Email</h4>
                          <p>Look out for follow-up emails with course access details and preparation materials.</p>
                      </div>
                  </div>
                  <div class="step">
                      <div class="step-number">2</div>
                      <div class="step-content">
                          <h4>Join WhatsApp Group</h4>
                          <p>Accept the WhatsApp group invitation when you receive it (within 24 hours).</p>
                      </div>
                  </div>
                  <div class="step">
                      <div class="step-number">3</div>
                      <div class="step-content">
                          <h4>Prepare for First Session</h4>
                          <p>Make sure you have a stable internet connection and are ready for the first live session on January 15, 2025.</p>
                      </div>
                  </div>
                  <div class="step">
                      <div class="step-number">4</div>
                      <div class="step-content">
                          <h4>Download Course Materials</h4>
                          <p>Access your course materials and prepare for an amazing learning experience.</p>
                      </div>
                  </div>
                </div>
            </div>
          
          <div class="footer">
              <div class="contact-info">
                  <strong>Need Help?</strong><br>
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

  // Send email to user
  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: email,
    subject: 'Welcome to EduMettle - Payment Confirmation & Next Steps',
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
}

async function sendSupportNotificationEmail(transporter: any, { name, email, paymentId, orderId, amount }: any) {
  // Email template for support team
  const supportEmailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Registration - EduMettle</title>
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
              padding: 20px;
              text-align: center;
          }
          .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 8px;
          }
          .content {
              padding: 40px 30px;
              text-align: center;
          }
          .title {
              font-size: 28px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 20px;
          }
          .subtitle {
              font-size: 18px;
              color: #4b5563;
              margin-bottom: 30px;
          }
          .details-card {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 25px;
              margin: 30px 0;
              text-align: left;
          }
          .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1px solid #e2e8f0;
          }
          .detail-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
          }
          .detail-label {
              font-weight: 600;
              color: #374151;
          }
          .detail-value {
              color: #1f2937;
          }
          .action-required {
              background-color: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              text-align: left;
          }
          .action-required h3 {
              color: #92400e;
              margin-top: 0;
              margin-bottom: 15px;
          }
          .action-required p {
              color: #78350f;
              margin: 0;
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
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">EduMettle</div>
              <div>New Registration Notification</div>
          </div>
          
          <div class="content">
              <div class="title">🎉 New Student Registration!</div>
              
              <div class="subtitle">
                  A new student has successfully registered and completed payment for the AI Fluency course.
              </div>
              
              <div class="details-card">
                  <div class="detail-row">
                      <span class="detail-label">Student Name:</span>
                      <span class="detail-value">${name}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Email:</span>
                      <span class="detail-value">${email}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Course:</span>
                      <span class="detail-value">AI Fluency</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Payment ID:</span>
                      <span class="detail-value">${paymentId}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Order ID:</span>
                      <span class="detail-value">${orderId}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Amount Paid:</span>
                      <span class="detail-value">Rs. ${amount}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Registration Time:</span>
                      <span class="detail-value">${new Date().toLocaleString()}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">Status:</span>
                      <span class="detail-value" style="color: #059669; font-weight: 600;">✓ Payment Confirmed</span>
                  </div>
              </div>
              
              <div class="action-required">
                  <h3>📋 Action Required</h3>
                  <p>Please ensure the following steps are completed within 24 hours:</p>
                  <ul style="margin: 10px 0; padding-left: 20px; color: #78350f;">
                      <li>Add student to the AI Fluency WhatsApp group</li>
                      <li>Send course access details and login credentials</li>
                      <li>Share pre-course preparation materials</li>
                      <li>Send session schedule and important dates</li>
                      <li>Provide technical requirements and setup guide</li>
                      <li>Send welcome message from instructor Abhisek Ganguly</li>
                  </ul>
              </div>
          </div>
          
          <div class="footer">
              <div class="contact-info">
                  <strong>EduMettle Support Team</strong><br>
                  This is an automated notification from the EduMettle registration system.<br>
                  Generated on: ${new Date().toLocaleString()}
              </div>
          </div>
      </div>
  </body>
  </html>
  `;

  // Send email to support team
  const supportMailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: 'support@edumettle.com',
    subject: `New Registration: ${name} - AI Fluency Course (Rs. ${amount})`,
    html: supportEmailHtml,
  };

  await transporter.sendMail(supportMailOptions);
}