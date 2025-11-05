import { Application, Status } from '@prisma/client';
import z from 'zod';

export type CreateApplicationFields = Pick<
  Application,
  'title' | 'applicationDate' | 'company' | 'notes' | 'status'
>;

export const createApplicationSchema: z.ZodType<CreateApplicationFields> =
  z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    notes: z.string().nullable(),
    status: z.enum(Status),
    applicationDate: z
      .string()
      .transform((dateAsString) => new Date(dateAsString)),
  });
