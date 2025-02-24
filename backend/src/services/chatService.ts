import OpenAI from 'openai';
import { config } from '../config/config';
import { ChatRequest, ChatResponse } from '../types/chat';

class ChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.azure.openAiKey,
      baseURL: `${config.azure.openAiEndpoint}/openai/deployments/${config.azure.openAiDeploymentName}`,
      defaultQuery: { 'api-version': '2024-02-15-preview' },
      defaultHeaders: { 'api-key': config.azure.openAiKey }
    });
  }

  async generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: config.azure.openAiDeploymentName!,
        messages: request.messages,
      });

      return completion as unknown as ChatResponse;
    } catch (error) {
      console.error('Error in chat service:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService(); 