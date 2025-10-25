import { prisma } from "@/lib/prisma";
import { Application, User } from "@prisma/client";

export async function getApplications(
  userId: User["id"],
): Promise<Application[]> {
  const applications = await prisma.application.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return applications;
}
