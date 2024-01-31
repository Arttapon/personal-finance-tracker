// src/components/auth/authService.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../../../prisma/src/generated/client/edge');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const registerUser = async (username, email, password) => {
  try {
    // ตรวจสอบว่ามี email ซ้ำหรือไม่
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // ทำการเข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่ม User ในฐานข้อมูล
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw new Error(`Error during user registration: ${error.message}`);
  }
};

module.exports = { registerUser };

