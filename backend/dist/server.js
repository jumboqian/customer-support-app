"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const chatController_1 = require("./controllers/chatController");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: config_1.config.cors.origin
}));
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.post('/api/chat', chatController_1.chatController.handleChatRequest);
// Error handling
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
