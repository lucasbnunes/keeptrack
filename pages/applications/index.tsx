import { Button } from "@/components/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ApplicationsContainer, ApplicationsLoaderContainer, ApplicationsSearchContainer } from "./style";
import { SearchInput } from "@/components/SearchInput";
import { ApplicationsTable } from "@/features/applications/ApplicationsTable";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NewApplicationModal } from "@/features/applications/NewApplicationModal";
import { useState } from "react";
import { useApplications } from "@/features/applications/useApplications";
import { Loader } from "@/components/Loader";
import { ApplicationsList } from "@/features/applications/ApplicationsList";
export default function Applications() {
  const { minWidth } = useMediaQuery()
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useApplications()

  if (isLoading) {
    return (
      <ApplicationsLoaderContainer>
        <Loader size="lg" />
      </ApplicationsLoaderContainer>
    )
  }

  return (
    <ApplicationsContainer>
      <NewApplicationModal open={open} setOpen={setOpen} />

      <Button onClick={() => setOpen(true)}>
        <PlusIcon /> New application
      </Button>

      <ApplicationsSearchContainer>
        <SearchInput placeholder="Search by company or job title" />
      </ApplicationsSearchContainer>

      {data && data?.length > 0 &&
        (
          minWidth("lg") ?
            <ApplicationsTable applications={data} />
            :
            <ApplicationsList applications={data} />
        )
      }
    </ApplicationsContainer>
  )
}

Applications.isPublic = false;