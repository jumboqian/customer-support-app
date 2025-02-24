import OpenAI from 'openai';
import { config } from '../config/config';
import { ChatRequest, ChatResponse } from '../types/chat';

class ChatService {
  private openai: OpenAI;

  constructor() {
    if (!config.azure.openAiKey || !config.azure.openAiEndpoint || !config.azure.openAiDeploymentName) {
      throw new Error('Missing required Azure OpenAI configuration');
    }

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
        messages: request.messages,
        model: 'gpt-35-turbo', // Use the model deployment name
        temperature: 0.7,
        max_tokens: 800,
      });

      return {
        message: completion.choices[0].message,
        usage: completion.usage
      };
    } catch (error) {
      console.error('Error in chat service:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService(); 