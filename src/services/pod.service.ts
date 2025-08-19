import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPod = async (podData: any) => {
  return prisma.pod.create({
    data: podData,
  });
};

export const getPodById = async (id: string) => {
  return prisma.pod.findUnique({
    where: { id },
  });
};

export const updatePod = async (id: string, podData: any) => {
  return prisma.pod.update({
    where: { id },
    data: podData,
  });
};

export const deletePod = async (id: string) => {
  return prisma.pod.delete({
    where: { id },
  });
};

export const getAllPods = async () => {
  return prisma.pod.findMany();
};
