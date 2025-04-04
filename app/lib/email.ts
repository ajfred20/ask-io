import nodemailer from 'nodemailer';

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

export interface EmailOptions {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  templateName?: string;
  templateData?: any[];
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error sending email:', data.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: (name: string) => ({
    subject: 'Welcome to Ask.io!',
    text: `Hi ${name}, Welcome to Ask.io! We're excited to have you on board.`,
    html: `
      <div style="font-family: 'Bricolage Grotesque', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Welcome to Ask.io!</h1>
        <p>Hi ${name},</p>
        <p>We're excited to have you on board. Ask.io is your AI-powered research assistant that helps you find answers to your questions instantly.</p>
        <p>Here are a few things you can do with Ask.io:</p>
        <ul>
          <li>Ask any research question</li>
          <li>Upload documents for analysis</li>
          <li>Share links for AI to analyze</li>
        </ul>
        <p>Get started by logging in to your account and asking your first question!</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Go to Dashboard</a>
        <p style="margin-top: 20px;">If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br>The Ask.io Team</p>
      </div>
    `
  }),
  
  PASSWORD_RESET: (resetLink: string) => ({
    subject: 'Reset Your Ask.io Password',
    text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
    html: `
      <div style="font-family: 'Bricolage Grotesque', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Reset Your Password</h1>
        <p>You requested a password reset for your Ask.io account.</p>
        <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Reset Password</a>
        <p style="margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The Ask.io Team</p>
      </div>
    `
  }),
  
  ACCOUNT_DELETED: (name: string) => ({
    subject: 'Your Ask.io Account Has Been Deleted',
    text: `Hi ${name}, Your Ask.io account has been successfully deleted. We're sorry to see you go.`,
    html: `
      <div style="font-family: 'Bricolage Grotesque', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Account Deleted</h1>
        <p>Hi ${name},</p>
        <p>Your Ask.io account has been successfully deleted.</p>
        <p>We're sorry to see you go. If you'd like to share any feedback about your experience, please reply to this email.</p>
        <p>You can always create a new account if you'd like to use our services again in the future.</p>
        <p>Best regards,<br>The Ask.io Team</p>
      </div>
    `
  }),
  
  LOW_CREDITS: (name: string, remainingCredits: number) => ({
    subject: 'Your Ask.io Credits Are Running Low',
    text: `Hi ${name}, Your Ask.io credits are running low. You have ${remainingCredits} credits remaining.`,
    html: `
      <div style="font-family: 'Bricolage Grotesque', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Low Credits Alert</h1>
        <p>Hi ${name},</p>
        <p>Your Ask.io credits are running low. You currently have <strong>${remainingCredits} credits</strong> remaining.</p>
        <p>To continue using all features of Ask.io without interruption, please consider purchasing additional credits.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Purchase Credits</a>
        <p style="margin-top: 20px;">Thank you for using Ask.io!</p>
        <p>Best regards,<br>The Ask.io Team</p>
      </div>
    `
  }),
  
  VERIFY_EMAIL: (otp: string) => ({
    subject: 'Verify Your Email - Ask.io',
    text: `Your verification code is: ${otp}. This code will expire in 5 minutes.`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Bricolage Grotesque', sans-serif;
              line-height: 1.6;
              color: #1f2937;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #3b82f6, #60a5fa);
              border-radius: 20px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .logo span {
              color: white;
              font-size: 36px;
              font-weight: 600;
            }
            h1 {
              color: #1f2937;
              font-size: 28px;
              font-weight: 600;
              margin: 0 0 20px;
            }
            .otp-container {
              background-color: #f3f4f6;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-code {
              font-family: monospace;
              font-size: 32px;
              letter-spacing: 4px;
              color: #3b82f6;
              font-weight: 600;
              background: white;
              padding: 15px 30px;
              border-radius: 8px;
              display: inline-block;
              margin: 20px 0;
            }
            .expiry {
              color: #6b7280;
              font-size: 14px;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <span>A</span>
              </div>
              <h1>Verify Your Email Address</h1>
              <p>Welcome to Ask.io! Please use the verification code below to complete your registration.</p>
            </div>
            
            <div class="otp-container">
              <p>Your verification code is:</p>
              <div class="otp-code">${otp}</div>
              <p class="expiry">This code will expire in 5 minutes</p>
            </div>
            
            <p>If you didn't request this verification code, you can safely ignore this email.</p>
            
            <div class="footer">
              <p>© 2024 Ask.io. All rights reserved.</p>
              <p>Questions? Email us at support@ask.io</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),
  
  VERIFICATION_SUCCESS: (name: string) => ({
    subject: 'Email Verified Successfully! ✅',
    text: `Hi ${name}, Your email has been verified successfully. Your account now has a verified badge!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
              background-color: #ffffff;
              border-radius: 16px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #3b82f6, #60a5fa);
              border-radius: 20px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
            }
            .logo span {
              color: white;
              font-size: 36px;
              font-weight: 700;
            }
            h1 {
              color: #1f2937;
              font-size: 28px;
              font-weight: 700;
              margin: 0 0 20px;
            }
            .success-container {
              background-color: #ecfdf5;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
              border: 1px solid #d1fae5;
            }
            .success-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            .cta-button {
              display: inline-block;
              background-color: #3b82f6;
              color: white;
              font-weight: 600;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              margin-top: 20px;
              box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
            }
            .features {
              margin: 30px 0;
              padding: 0;
              list-style: none;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
            }
            .feature {
              background-color: #f3f4f6;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
            }
            .feature-icon {
              font-size: 32px;
              margin-bottom: 10px;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
            @media (max-width: 600px) {
              .container {
                padding: 20px 15px;
              }
              .features {
                grid-template-columns: 1fr;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <span>A</span>
              </div>
              <h1>Email Verified Successfully! 🎉</h1>
              <p>Congratulations ${name}! Your email has been verified and your account is now fully activated.</p>
            </div>
            
            <div class="success-container">
              <div class="success-icon">✅</div>
              <h2>You're all set!</h2>
              <p>Your account now has a verified badge, giving you access to all features.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="cta-button">Go to Dashboard</a>
            </div>
            
            <p>Here's what you can do with your verified account:</p>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">🔍</div>
                <h3>AI Research</h3>
                <p>Get instant answers to complex questions</p>
              </div>
              <div class="feature">
                <div class="feature-icon">📄</div>
                <h3>Document Analysis</h3>
                <p>Upload and analyze documents</p>
              </div>
              <div class="feature">
                <div class="feature-icon">💾</div>
                <h3>Save Research</h3>
                <p>Organize and save your findings</p>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2024 Ask.io. All rights reserved.</p>
              <p>📧 Questions? Email us at support@ask.io</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),
}; 