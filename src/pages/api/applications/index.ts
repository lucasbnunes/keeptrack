// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertIncomingHttpHeadersToHeaders } from "@/utils/convertHeaders";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth.api.getSession({
    headers: convertIncomingHttpHeadersToHeaders(req.headers),
  });
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id || "",
    },
  });

  if (!session || !user) {
    res.status(401).send({
      message: "You must be signed in to access this route",
    });
    return;
  }

  switch (req.method) {
    case "POST": {
      const application = await prisma.application.create({
        data: {
          company: req.body.company,
          title: req.body.title,
          notes: req.body.notes,
          status: "applied",
          createdAt: new Date(),
          applicationDate: new Date(req.body.applicationDate),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.status(201).send(application);
      break;
    }
    case "GET": {
      const applications = await prisma.application.findMany({
        where: {
          userId: user.id,
          ...(req.query.search
            ? {
                OR: [
                  {
                    company: {
                      contains: (req.query.search as string) || undefined,
                      mode: "insensitive",
                    },
                  },
                  {
                    title: {
                      contains: (req.query.search as string) || undefined,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      res.status(200).send(applications);
      break;
    }
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
