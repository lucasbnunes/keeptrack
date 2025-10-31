'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Application } from '@prisma/client';
import { ApplicationsTable } from '@/features/applications/ApplicationsTable';
import { ApplicationsList } from '@/features/applications/ApplicationsList';

interface ResponsiveApplicationsProps {
  applications: Application[];
}

export function ResponsiveApplications({
  applications,
}: ResponsiveApplicationsProps) {
  const { minWidth } = useMediaQuery();

  if (minWidth('lg')) {
    return <ApplicationsTable applications={applications} />;
  } else {
    return <ApplicationsList applications={applications} />;
  }
}
