// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id || '',
    },
  });
  const { id: applicationId } = req.query;

  if (!session || !user) {
    res.status(401).send({
      message: 'You must be signed in to access this route',
    });
    return;
  }

  if (!applicationId) {
    res.status(404).send({
      message: 'Application not found',
    });
    return;
  }

  switch (req.method) {
    case 'PUT': {
      const application = await prisma.application.update({
        data: {
          title: req.body.title,
          company: req.body.company,
          notes: req.body.notes,
          status: req.body.status,
        },
        where: {
          id: applicationId as string,
        },
      });

      res.status(200).send(application);
      break;
    }
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
