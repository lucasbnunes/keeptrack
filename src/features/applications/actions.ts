'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const newApplicationSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  notes: z.string(),
  applicationDate: z
    .string()
    .min(1)
    .transform((value) => new Date(value)),
});

// TODO: refine validation and error handling
export async function createApplication(formData: FormData) {
  const values = Object.fromEntries(formData);
  const parsed = newApplicationSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: 400,
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      status: 401,
    };
  }

  const application = await prisma.application.create({
    data: {
      company: parsed.data.company,
      title: parsed.data.title,
      notes: parsed.data.notes,
      status: 'applied',
      createdAt: new Date(),
      applicationDate: parsed.data.applicationDate,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  revalidatePath('/app/applications');

  return {
    status: 200,
    data: application,
  };
}

const updateApplicationSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  title: z.string().min(1),
  notes: z.string(),
});

export async function updateApplication(formData: FormData) {
  const values = Object.fromEntries(formData);
  const parsed = updateApplicationSchema.safeParse(values);
  console.log(parsed);

  if (!parsed.success) {
    return {
      status: 400,
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      status: 401,
    };
  }

  const application = await prisma.application.update({
    data: {
      company: parsed.data.company,
      title: parsed.data.title,
      notes: parsed.data.notes,
      status: 'applied',
    },
    where: {
      id: parsed.data.id,
    },
  });

  revalidatePath('/app/applications');

  return {
    status: 200,
    data: application,
  };
}
