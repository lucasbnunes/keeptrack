import { InputLabel } from "./style";

interface InputProps {
  label: string;
  fullWidth?: boolean;
  inputProps?: React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement>;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

export function Input({ label, fullWidth = false, multiline = false, inputProps, ...props }: InputProps) {
  return (
    <InputLabel fullWidth={fullWidth} {...props}>
      <span>{label}</span>

      {multiline ? (
        <textarea {...(inputProps as React.HTMLProps<HTMLTextAreaElement>)} />
      ) : (
        <input {...(inputProps as React.HTMLProps<HTMLInputElement>)} />
      )}
    </InputLabel>
  )
}