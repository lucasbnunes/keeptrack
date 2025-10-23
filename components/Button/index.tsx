"use client";

import { ButtonLoader, StyledButton } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "text" | "solid";
}

export function Button({
  children,
  loading,
  variant = "text",
  ...props
}: ButtonProps) {
  return (
    <StyledButton disabled={loading} variant={variant} {...props}>
      {children}
      {loading && <ButtonLoader size="sm" />}
    </StyledButton>
  );
}
