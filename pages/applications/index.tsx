import { Button } from "@/components/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ApplicationsContainer, ApplicationsSearchContainer } from "./style";
import { SearchInput } from "@/components/SearchInput";
import { ApplicationsTable } from "@/features/applications/ApplicationsTable";
import { ApplicationsList } from "@/features/applications/ApplicationsList";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Applications() {
  const { minWidth } = useMediaQuery()

  return (
    <ApplicationsContainer>
      <Button>
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