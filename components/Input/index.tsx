import { ReactNode } from "react";
import { InputLabel } from "./style";

interface InputProps {
  label: string;
  fullWidth?: boolean;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

export function Input({ label, fullWidth = false, inputProps, ...props }: InputProps) {
  return (
    <InputLabel fullWidth={fullWidth} {...props}>
      <span>{label}</span>
      <input {...inputProps} />
    </InputLabel>
  )
}