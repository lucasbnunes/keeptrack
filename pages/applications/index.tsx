import { Button } from "@/components/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ApplicationsContainer, ApplicationsSearchContainer } from "./style";
import { SearchInput } from "@/components/SearchInput";
import { ApplicationsTable } from "@/features/applications/ApplicationsTable";
import { ApplicationsList } from "@/features/applications/ApplicationsList";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NewApplicationModal } from "@/features/applications/NewApplicationModal";
import { useState } from "react";

export default function Applications() {
  const { minWidth } = useMediaQuery()
  const [open, setOpen] = useState(false)

  return (
    <ApplicationsContainer>
      <NewApplicationModal open={open} setOpen={setOpen} />

      <Button onClick={() => setOpen(true)}>
        <PlusIcon /> New application
      </Button>

      <ApplicationsSearchContainer>
        <SearchInput placeholder="Search by company or job title" />
      </ApplicationsSearchContainer>

      {minWidth("lg") ?
        <ApplicationsTable />
        :
        <ApplicationsList />
      }

    </ApplicationsContainer>
  )
}

Applications.isPublic = false;