"use client";

import { SearchInput } from "@/components/SearchInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { ApplicationsSearchForm } from "./style";

const paramName = "search";

export function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams || {});
    const value = e.target.value;

    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <ApplicationsSearchForm>
      <SearchInput
        placeholder="Search by company or job title"
        inputProps={{ onChange: handleSearch }}
      />
    </ApplicationsSearchForm>
  );
}
