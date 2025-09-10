import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    console.log('=== ZOHO MAIL DEBUG ===');
    console.log('Email:', process.env.ZOHO_EMAIL);
    console.log('Password length:', process.env.ZOHO_PASSWORD?.length);
    console.log('Password starts with:', process.env.ZOHO_PASSWORD?.substring(0, 3) + '...');
    
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Zoho credentials not found' },
        { status: 400 }
      );
    }

    // Test with different Zoho SMTP servers
    const configs = [
      {
        name: 'Zoho Mail (smtp.zoho.com) - Port 465 SSL',
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
        name: 'Zoho Mail (smtp.zoho.com) - Port 587 STARTTLS',
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
        name: 'Zoho Mail (smtp.zoho.in) - Port 465 SSL',
        config: {
          host: 'smtp.zoho.in',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
          },
        }
      },
      {
        name: 'Zoho Mail (smtp.zoho.in) - Port 587 STARTTLS',
        config: {
          host: 'smtp.zoho.in',
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
      }
    ];

    const results = [];

    for (const { name, config } of configs) {
      try {
        console.log(`\n--- Testing ${name} ---`);
        const transporter = nodemailer.createTransport(config);
        
        // Test connection with detailed logging
        console.log('Attempting connection verification...');
        await transporter.verify();
        console.log(`✅ ${name} - Connection successful!`);
        results.push({ config: name, status: 'success', message: 'Connection verified' });
        
        // If connection works, try sending a test email
        try {
          console.log('Attempting to send test email...');
          const testEmail = await transporter.sendMail({
            from: process.env.ZOHO_EMAIL,
            to: process.env.ZOHO_EMAIL, // Send to self for testing
            subject: 'Test Email from EduMettle - ' + new Date().toISOString(),
            text: 'This is a test email to verify SMTP configuration.',
            html: '<p>This is a test email to verify SMTP configuration.</p><p>Sent at: ' + new Date().toISOString() + '</p>'
          });
          
          console.log(`✅ ${name} - Test email sent successfully!`);
          console.log('Message ID:', testEmail.messageId);
          results.push({ 
            config: name, 
            status: 'email_sent', 
            message: 'Test email sent successfully',
            messageId: testEmail.messageId
          });
          
          // Return success on first working configuration
          return NextResponse.json({
            success: true,
            workingConfig: name,
            messageId: testEmail.messageId,
            allResults: results,
            message: 'Email configuration working!'
          });
          
        } catch (emailError: any) {
          console.log(`❌ ${name} - Email sending failed:`, emailError.message);
          results.push({ config: name, status: 'email_failed', message: emailError.message });
        }
        
      } catch (error: any) {
        console.log(`❌ ${name} - Connection failed:`, error.message);
        console.log('Error code:', error.code);
        console.log('Error response:', error.response);
        results.push({ 
          config: name, 
          status: 'failed', 
          message: error.message,
          code: error.code,
          response: error.response
        });
      }
    }

    // If we get here, no configuration worked
    return NextResponse.json({
      success: false,
      results,
      message: 'All email configurations failed. Check Zoho Mail settings.',
      suggestions: [
        '1. Verify App Password is correct (16 characters)',
        '2. Check if SMTP access is enabled in Zoho Mail settings',
        '3. Ensure the email domain matches your Zoho account',
        '4. Try logging into Zoho Mail web interface to verify credentials',
        '5. Check if your Zoho account has any restrictions'
      ]
    });

  } catch (error: any) {
    console.error('Debug email error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
