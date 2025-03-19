import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// Store this in an environment variable in production
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Set up safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Simple rate limiting
const rateLimiter = {
  tokens: 10,
  refillRate: 2, // tokens per second
  lastRefill: Date.now(),
  maxTokens: 10,
  
  getToken: function(): boolean {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // in seconds
    
    // Refill tokens based on time passed
    this.tokens = Math.min(this.maxTokens, this.tokens + timePassed * this.refillRate);
    this.lastRefill = now;
    
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    
    return false;
  }
};

export async function generateResponse(prompt: string, userId?: string): Promise<string> {
  try {
    // Check rate limit
    if (!rateLimiter.getToken()) {
      return "I'm receiving too many requests right now. Please try again in a moment.";
    }
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings,
    });
    
    // Log request for analytics (in a real app, you'd store this in a database)
    console.log(`[${new Date().toISOString()}] User ${userId || 'anonymous'} prompt: ${prompt.substring(0, 100)}...`);
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "I've reached my API quota limit. Please try again later.";
      }
      if (error.message.includes('blocked')) {
        return "I'm unable to respond to this request due to safety concerns.";
      }
    }
    
    return "I'm sorry, I encountered an error while processing your request.";
  }
}

// Function to analyze files (for future implementation)
export async function analyzeFile(fileContent: string, fileName: string, fileType: string, userId?: string): Promise<string> {
  try {
    // Check rate limit
    if (!rateLimiter.getToken()) {
      return "I'm receiving too many requests right now. Please try again in a moment.";
    }
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings,
    });
    
    // Log request for analytics
    console.log(`[${new Date().toISOString()}] User ${userId || 'anonymous'} analyzing file: ${fileName}`);
    
    const prompt = `Analyze this ${fileType} file named "${fileName}": ${fileContent}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing file:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "I've reached my API quota limit. Please try again later.";
      }
      if (error.message.includes('blocked')) {
        return "I'm unable to analyze this file due to safety concerns.";
      }
      if (error.message.includes('too large') || error.message.includes('size')) {
        return "This file is too large for me to analyze. Please try a smaller file.";
      }
    }
    
    return "I'm sorry, I encountered an error while analyzing your file.";
  }
} 