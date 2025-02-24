# Customer Support LLM App

A modern customer support application powered by Azure OpenAI, built with React and Node.js.

## Project Structure

```
.
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── ...
│   └── package.json
├── backend/           # Node.js Express backend
│   ├── src/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Azure OpenAI Service account
- Azure subscription

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Fill in your Azure OpenAI credentials in the `.env` file:
   ```
   PORT=3001
   AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
   AZURE_OPENAI_KEY=your_azure_openai_key
   AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Development

- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:3001`

## Deployment

### Azure Deployment

1. Create an Azure Web App Service for both frontend and backend
2. Set up environment variables in Azure App Service Configuration
3. Deploy using Azure CLI or GitHub Actions

## Features

- Real-time chat interface
- Integration with Azure OpenAI
- Modern, responsive design
- TypeScript support
- Error handling and loading states

## License

MIT 