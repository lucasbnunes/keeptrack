"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const paramName = "search";
const placeholder = "Company or job title";

export function SearchForm() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams || {});
    const value = search;

    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      className="my-6 flex items-center gap-2 max-w-sm"
      onSubmit={handleSearch}
    >
      <Field>
        <FieldLabel
          aria-label={placeholder}
          htmlFor={paramName}
          className="hidden"
        />
        <Input
          id={paramName}
          name={paramName}
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>
      <Button variant="secondary" type="submit">
        Search
      </Button>
    </form>
  );
}
