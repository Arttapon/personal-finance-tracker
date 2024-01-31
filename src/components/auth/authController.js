// src/components/auth/authController.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../../../prisma/src/generated/client/edge');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const authService = require('./authService');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const token = await authService.login(usernameOrEmail, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, username: true, email: true },
  });
  res.json(user);
};

module.exports = { register, login, getProfile };
