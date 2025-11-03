import { ApplicationsKanban } from '@/features/applications/components/applications-kanban';
import {
  getApplications,
  searchApplications,
} from '@/features/applications/service';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Applications({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  const params = await searchParams;
  let applications;

  if (params.search) {
    applications = await searchApplications(
      session?.user.id,
      String(params.search),
    );
  } else {
    applications = await getApplications(session?.user.id);
  }

  return (
    <div className="mx-auto mt-10 px-4 xl:mt-20">
      <div className="container mx-auto">
        <ApplicationsKanban applications={applications} />
      </div>
    </div>
  );
}
