// ChatController.js
// Controlador para el chat con IA
const OpenAI = require('openai');
const db = require('../db');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || null,
});

/**
 * Generate mock response based on user input
 * @param {string} message - User message
 * @returns {string} Mock response
 */

//MODIFICAR ELSE IF, esto es solo de prueba!!
function generateMockResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('excel')) {
    return "I can help you with Excel file processing! I can analyze spreadsheets, categorize data, and provide insights about your Excel files. What specific Excel task would you like help with?";
  } else if (lowerMessage.includes('image')) {
    return "Great! I specialize in image analysis for product categorization. I can analyze product images and automatically categorize them for your Excel files. Do you have images you'd like me to analyze?";
  } else if (lowerMessage.includes('help')) {
    return "I'm here to help! I can assist with:\n\n• Excel file processing and analysis\n• Image recognition for product categorization\n• Data insights and organization\n• Automated spreadsheet updates\n\nWhat would you like to start with?";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! 👋 I'm your AI Excel Assistant. I'm ready to help you with Excel processing, image analysis, and data organization. How can I assist you today?";
  } else if (lowerMessage.includes('upload')) {
    return "Perfect! I can help you upload and process Excel files. Once you upload your Excel file, I'll be able to analyze its structure, suggest improvements, and help with data categorization. Would you like to start with uploading a file?";
  } else if (lowerMessage.includes('categories') || lowerMessage.includes('categorize')) {
    return "I excel at categorizing data! I can automatically categorize products based on images, organize your data into meaningful groups, and suggest category structures for your Excel files. What type of categorization do you need help with?";
  } else {
    return `I understand you're asking about: "${message}"\n\nI'm currently in demo mode, but I'm designed to help with Excel file processing and image analysis. Once connected to the AI service, I'll be able to provide detailed assistance with your specific needs!\n\nTry asking about "excel", "images", "upload", or "help" for more specific responses.`;
  }
}

/**
 * Handle chat with AI
 * @param {Request} req
 * @param {Response} res
 */
exports.chat = async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== 'user') {
      return res.status(400).json({ error: 'Last message must be from user' });
    }

    let response;

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Use mock responses for development
      console.log('Using mock AI response (no API key configured)');
      response = generateMockResponse(lastUserMessage.content);
    } else {
      // Use real OpenAI API
      console.log('Using OpenAI API for response');
      
      const systemPrompt = {
        role: 'system',
        content: `You are an AI assistant specialized in Excel file processing and image analysis. 
        You help users analyze Excel files, categorize products from images, and provide insights 
        about their data. Be helpful, professional, and concise in your responses.`
      };

      const allMessages = [systemPrompt, ...messages];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: allMessages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      response = completion.choices[0].message.content;
    }

    // Save the conversation to database
    try {
      await db.Prompt.create({
        userId: userId,
        message: lastUserMessage.content,
        response: response
      });
    } catch (dbError) {
      console.error('Error saving prompt to database:', dbError);
      // Continue even if DB save fails
    }

    // Return plain text response for streaming compatibility
    res.setHeader('Content-Type', 'text/plain');
    res.send(response);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process chat request' 
    });
  }
};
