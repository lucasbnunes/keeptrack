import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { SearchInput } from "@/components/SearchInput";
import { ApplicationsList } from "@/features/applications/ApplicationsList";
import { ApplicationsTable } from "@/features/applications/ApplicationsTable";
import { NewApplicationModal } from "@/features/applications/NewApplicationModal";
import {
  ApplicationsContainer,
  ApplicationsLoaderContainer,
  ApplicationsSearchForm,
} from "@/features/applications/applicationsPageStyle";
import { useApplications } from "@/features/applications/useApplications";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { auth } from "@/lib/auth";
import { convertIncomingHttpHeadersToHeaders } from "@/utils/convertHeaders";
import { PlusIcon } from "@radix-ui/react-icons";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface SearchForm {
  search: string;
}

export const getServerSideProps = (async (context) => {
  const session = await auth.api.getSession({
    headers: convertIncomingHttpHeadersToHeaders(context.req.headers),
  });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}) satisfies GetServerSideProps;

export default function Applications() {
  const { minWidth } = useMediaQuery();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useApplications(search);
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    setSearch(data.search);
  };

  if (isLoading) {
    return (
      <ApplicationsLoaderContainer>
        <Loader size="lg" />
      </ApplicationsLoaderContainer>
    );
  }

  return (
    <ApplicationsContainer>
      <NewApplicationModal open={open} setOpen={setOpen} />

      <Button onClick={() => setOpen(true)} variant="solid">
        <PlusIcon /> New application
      </Button>

      <ApplicationsSearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          placeholder="Search by company or job title"
          inputProps={{ ...register("search") }}
        />
      </ApplicationsSearchForm>

      {data &&
        data?.length > 0 &&
        (minWidth("lg") ? (
          <ApplicationsTable applications={data} />
        ) : (
          <ApplicationsList applications={data} />
        ))}
    </ApplicationsContainer>
  );
}

Applications.isPublic = false;
