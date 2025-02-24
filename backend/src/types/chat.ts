import { ChatCompletionMessage } from 'openai/resources/chat';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatCompletionMessage[];
}

export interface ChatResponse {
  message: ChatCompletionMessage;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
} 