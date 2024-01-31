// src/index.js
const express = require('express');
const { PrismaClient } = require('../prisma/src/generated/client/edge');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const port = 6969;

app.use(express.json());

const authController = require('./components/auth/authController');
const authMiddleware = require('./components/auth/authMiddleware');

// Register and Login
app.post('/register', authController.register);
app.post('/login', authController.login);

// Protected route, require authentication
app.get('/profile', authMiddleware.authenticateToken, authController.getProfile);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
