'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { Application, Status } from '@prisma/client';
import {
  createApplication,
  deleteApplication,
  updateApplication,
  updateApplication as updateApplicationService,
} from '@/features/applications/service';
import { createApplicationSchema, updateApplicationSchema } from './schemas';

// TODO: refine validation and error handling
export async function createApplicationAction(formData: FormData) {
  const values = Object.fromEntries(formData);
  const parsed = createApplicationSchema.safeParse(values);

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

  const application = await createApplication(session.user.id, parsed.data);

  revalidatePath('/app/applications');

  return {
    status: 200,
    data: application,
  };
}

export async function updateApplicationAction(formData: FormData) {
  const values = Object.fromEntries(formData);
  const parsed = updateApplicationSchema.safeParse(values);

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

  const application = await updateApplication(session.user.id, parsed.data);

  revalidatePath('/app/applications');

  return {
    status: 200,
    data: application,
  };
}

export async function updateApplicationStatus(
  applicationId: Application['id'],
  newStatus: Status,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      status: 401,
    };
  }

  await updateApplicationService(session.user.id, {
    id: applicationId,
    status: newStatus,
  });

  revalidatePath('/app/applications');
}

export async function deleteApplicationAction(
  applicationId: Application['id'],
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      status: 401,
    };
  }

  await deleteApplication(session.user.id, applicationId);

  revalidatePath('/app/applications');

  return {
    status: 200,
  };
}
