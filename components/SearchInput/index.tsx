import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchLabel } from "./style";

interface SearchInputProps {
  placeholder: string;
  className?: string;
}

export function SearchInput({ className, placeholder }: SearchInputProps) {
  return (
    <SearchLabel aria-label={placeholder} className={className}>
      <MagnifyingGlassIcon />
      <input placeholder={placeholder} />
    </SearchLabel>
  )
}