import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  azure: {
    openAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
    openAiKey: process.env.AZURE_OPENAI_KEY,
    openAiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  }
}; 