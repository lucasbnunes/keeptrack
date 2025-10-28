import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchLabel } from "./style";

interface SearchInputProps {
  placeholder: string;
  className?: string;
  inputProps?: React.HTMLProps<HTMLInputElement>
}

export function SearchInput({ className, placeholder, inputProps }: SearchInputProps) {
  return (
    <SearchLabel aria-label={placeholder} className={className}>
      <MagnifyingGlassIcon />
      <input {...inputProps} placeholder={placeholder} />
    </SearchLabel>
  )
}