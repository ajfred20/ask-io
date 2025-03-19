import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const msg = {
      to: options.to,
      from: options.from || process.env.EMAIL_FROM || 'noreply@ask.io',
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    
    await sgMail.send(msg);
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3b82f6;">Low Credits Alert</h1>
        <p>Hi ${name},</p>
        <p>Your Ask.io credits are running low. You currently have <strong>${remainingCredits} credits</strong> remaining.</p>
        <p>To continue using all features of Ask.io without interruption, please consider purchasing additional credits.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Purchase Credits</a>
        <p style="margin-top: 20px;">Thank you for using Ask.io!</p>
        <p>Best regards,<br>The Ask.io Team</p>
      </div>
    `
  })
}; 