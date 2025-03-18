import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// Store this in an environment variable in production
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm sorry, I encountered an error while processing your request.";
  }
}

// Function to analyze files (for future implementation)
export async function analyzeFile(fileContent: string, fileName: string, fileType: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze this ${fileType} file named "${fileName}": ${fileContent}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing file:", error);
    return "I'm sorry, I encountered an error while analyzing your file.";
  }
} 