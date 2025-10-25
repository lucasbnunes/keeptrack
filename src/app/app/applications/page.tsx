import { NewApplicationModal } from "@/features/applications/NewApplicationDialog";
import { ApplicationsContainer } from "@/features/applications/applicationsPageStyle";
import { getApplications } from "@/features/applications/service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Applications() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }

  const applications = await getApplications(session?.user.id);

  return (
    <ApplicationsContainer>
      <NewApplicationModal />

      {/*{data &&
        data?.length > 0 &&
        (minWidth("lg") ? (
          <ApplicationsTable applications={data} />
        ) : (
          <ApplicationsList applications={data} />
        ))}*/}
    </ApplicationsContainer>
  );
}
