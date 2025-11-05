import { prisma } from '@/lib/prisma';
import { Application, User, Prisma } from '@prisma/client';
import { CreateApplicationFields, UpdateApplicationFields } from './schemas';

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

export async function updateApplication(
  userId: User['id'],
  { id, ...application }: UpdateApplicationFields,
) {
  return await prisma.application.update({
    data: application,
    where: {
      id,
      userId,
    },
  });
}

export async function createApplication(
  userId: User['id'],
  application: CreateApplicationFields,
) {
  return await prisma.application.create({
    data: {
      company: application.company,
      title: application.title,
      notes: application.notes,
      status: application.status,
      createdAt: new Date(),
      applicationDate: application.applicationDate,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
