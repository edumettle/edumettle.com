import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Zoho Mail connection...');
    console.log('Email:', process.env.ZOHO_EMAIL);
    console.log('Password length:', process.env.ZOHO_PASSWORD?.length);

    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Zoho credentials not found' },
        { status: 400 }
      );
    }

    // Test different SMTP configurations
    const configs = [
      {
        name: 'Config 1: Port 465 SSL',
        config: {
          host: 'smtp.zoho.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
          },
        }
      },
      {
        name: 'Config 2: Port 587 STARTTLS',
        config: {
          host: 'smtp.zoho.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      },
      {
        name: 'Config 3: Port 465 with TLS options',
        config: {
          host: 'smtp.zoho.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
          }
        }
      }
    ];

    const results = [];

    for (const { name, config } of configs) {
      try {
        console.log(`Testing ${name}...`);
        const transporter = nodemailer.createTransport(config);
        
        // Test connection
        await transporter.verify();
        console.log(`✅ ${name} - Connection successful`);
        results.push({ config: name, status: 'success', message: 'Connection verified' });
        
        // If connection works, try sending a test email
        try {
          await transporter.sendMail({
            from: process.env.ZOHO_EMAIL,
            to: process.env.ZOHO_EMAIL, // Send to self for testing
            subject: 'Test Email from EduMettle',
            text: 'This is a test email to verify SMTP configuration.',
            html: '<p>This is a test email to verify SMTP configuration.</p>'
          });
          console.log(`✅ ${name} - Test email sent successfully`);
          results.push({ config: name, status: 'email_sent', message: 'Test email sent successfully' });
        } catch (emailError) {
          console.log(`❌ ${name} - Email sending failed:`, emailError.message);
          results.push({ config: name, status: 'email_failed', message: emailError.message });
        }
        
        break; // If we found a working config, stop testing others
        
      } catch (error: any) {
        console.log(`❌ ${name} - Connection failed:`, error.message);
        results.push({ config: name, status: 'failed', message: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Email configuration test completed'
    });

  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
