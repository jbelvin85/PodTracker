import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (userData: any) => {
  return prisma.user.create({
    data: userData,
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const getUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

export const updateUser = async (id: string, userData: any) => {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};
