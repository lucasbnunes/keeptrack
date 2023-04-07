import { Button } from "@/components/Button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ApplicationsContainer, ApplicationsSearchContainer } from "./style";
import { SearchInput } from "@/components/SearchInput";
import { ApplicationsTable } from "@/features/applications/ApplicationsTable";

export default function Applications() {
  return (
    <ApplicationsContainer>
      <Button>
        <PlusIcon /> New application
      </Button>

      <ApplicationsSearchContainer>
        <SearchInput placeholder="Search by company or job title" />
      </ApplicationsSearchContainer>


      <ApplicationsTable />

    </ApplicationsContainer>
  )
}

Applications.isPublic = false;