import { NewApplicationModal } from '@/features/applications/NewApplicationDialog';
import { ResponsiveApplications } from '@/features/applications/ResponsiveApplications';
import { SearchForm } from '@/features/applications/SearchForm';
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
    <div className="mx-auto mt-10 max-w-7xl px-4 xl:mt-20">
      <NewApplicationModal />

      <SearchForm />
      <ResponsiveApplications applications={applications} />
    </div>
  );
}
