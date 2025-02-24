import { Request, Response } from 'express';
import { chatService } from '../services/chatService';
import { ChatRequest } from '../types/chat';

export const chatController = {
  async handleChatRequest(req: Request, res: Response) {
    try {
      const chatRequest = req.body as ChatRequest;
      
      // Validate request
      if (!chatRequest.messages || !Array.isArray(chatRequest.messages) || chatRequest.messages.length === 0) {
        return res.status(400).json({ error: 'Invalid request format. Messages array is required.' });
      }

      // Generate response
      const response = await chatService.generateChatResponse(chatRequest);
      res.json(response);
    } catch (error) {
      console.error('Error in chat controller:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}; 