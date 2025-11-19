import { Application, Status } from '@prisma/client';
import z from 'zod';

export const createApplicationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  notes: z.string().optional(),
  status: z.enum(Status),
  applicationDate: z
    .string()
    .transform((dateAsString) => new Date(dateAsString)),
  jobUrl: z.url().optional(),
});

export type CreateApplicationFields = z.output<typeof createApplicationSchema>;

export const updateApplicationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required').optional(),
  company: z.string().min(1, 'Company is required').optional(),
  notes: z.string().nullable().optional(),
  status: z.enum(Status).optional(),
  applicationDate: z
    .string()
    .transform((dateAsString) => new Date(dateAsString))
    .optional(),
  jobUrl: z.url().nullable().optional(),
});

export type UpdateApplicationFields = z.output<typeof updateApplicationSchema>;
