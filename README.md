# Customer Support App

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
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── types/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Features

- Real-time chat interface
- Integration with Azure OpenAI
- Modern, responsive design
- TypeScript support
- Error handling and loading states
- Secure API integration

## Tech Stack

### Frontend
- React
- TypeScript
- Modern CSS
- Azure Web Apps deployment

### Backend
- Node.js
- Express
- TypeScript
- Azure OpenAI
- Azure Web Apps deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Azure OpenAI Service account
- Azure subscription

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

4. Fill in your Azure OpenAI credentials in the `.env` file.

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

The application is deployed on Azure Web Apps:
- Frontend: https://customer-support-frontend.azurewebsites.net
- Backend: https://customer-support-backend.azurewebsites.net

## License

MIT 