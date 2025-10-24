import { NewApplicationModal } from "@/features/applications/NewApplicationDialog";
import { ApplicationsContainer } from "@/features/applications/applicationsPageStyle";

export default function Applications() {
  return (
    <ApplicationsContainer>
      <NewApplicationModal />

      {/*<ApplicationsSearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          placeholder="Search by company or job title"
          inputProps={{ ...register("search") }}
        />
      </ApplicationsSearchForm>*/}
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
