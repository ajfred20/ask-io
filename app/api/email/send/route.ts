import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EMAIL_TEMPLATES } from '@/app/lib/email';

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text, html, templateName, templateData } = await request.json();
    
    let emailContent;
    
    // If a template is specified, use it
    if (templateName && templateData) {
      // @ts-ignore - Dynamic template access
      const template = EMAIL_TEMPLATES[templateName];
      if (template) {
        emailContent = template(...templateData);
      } else {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 400 }
        );
      }
    } else {
      // Otherwise use the provided content
      emailContent = { subject, text, html };
    }
    
    const msg = {
      from: process.env.EMAIL_FROM || 'noreply@ask.io',
      to,
      ...emailContent
    };
    
    await transporter.sendMail(msg);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 