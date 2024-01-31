// src/components/user/userService.js
const { PrismaClient } = require('../../../prisma/src/generated/client/edge');
const prisma = new PrismaClient();

const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

module.exports = { getUserById };
