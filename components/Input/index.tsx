import { InputLabel } from "./style";
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

interface InputProps {
  label: string;
  fullWidth?: boolean;
  inputProps?: HTMLInputProps;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

type HTMLInputProps = React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement> & UseFormRegisterReturn;

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