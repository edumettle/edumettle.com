import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, paymentId, orderId, amount } = await request.json();

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
            .next-steps {
                background-color: #f0f9ff;
                border-left: 4px solid #8b5cf6;
                padding: 20px;
                margin: 30px 0;
                border-radius: 0 8px 8px 0;
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
                <div class="logo-text">EduMettle</div>
                <div class="tagline">Empowering Your Learning Journey</div>
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
                        <span class="detail-value">₹${amount}</span>
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
                
                <div style="text-align: center;">
                    <a href="https://www.edumettle.com/success" class="cta-button">Download Receipt</a>
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

    // Send email
    const mailOptions = {
      from: process.env.ZOHO_EMAIL,
      to: email,
      subject: 'Welcome to EduMettle - Payment Confirmation & Next Steps',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Confirmation email sent successfully' });

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}