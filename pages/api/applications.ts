// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const allowedMethods = ['GET', 'POST', 'PUT'];

  if (!session) {
    res.status(401).send({
      message: 'You must be signed in to access this route',
    });
  }

  if (!req.method || !allowedMethods.includes(req.method)) {
    res.status(405).json({ error: 'Method not allowed' });
  }

  switch (req.method) {
    case 'POST':
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user.id,
        },
      });

      if (user) {
        const application = await prisma.application.create({
          data: {
            company: req.body.company,
            title: req.body.title,
            notes: req.body.notes,
            status: 'applied',
            createdAt: new Date(),
            applicationDate: req.body.applicationDate,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        res.status(201).send(application);
      } else {
        res.status(404).json({ error: 'User not found' });
      }

    default:
  }
}
