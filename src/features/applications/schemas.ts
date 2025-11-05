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

export const updateApplicationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  notes: z.string().nullable().optional(),
  status: z.enum(Status).optional(),
  applicationDate: z
    .string()
    .transform((dateAsString) => new Date(dateAsString))
    .optional(),
});

export type UpdateApplicationFields = z.output<typeof updateApplicationSchema>;
