import { prisma } from '@/lib/prisma';
import { Application, User } from '@prisma/client';

export async function getApplications(
  userId: User['id'],
  searchTerm?: string,
): Promise<Application[]> {
  const applications = await prisma.application.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return applications;
}

export async function searchApplications(
  userId: User['id'],
  searchTerm: string,
) {
  const applications = await prisma.application.findMany({
    where: {
      userId,
      OR: [
        {
          company: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return applications;
}

export async function updateApplication({
  id,
  userId,
  ...application
}: {
  id: Application['id'];
  userId: Application['userId'];
} & Omit<Partial<Application>, 'createdAt'>) {
  return await prisma.application.update({
    data: application,
    where: {
      id,
      userId,
    },
  });
}
