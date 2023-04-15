import { Loader } from "../Loader";
import { ButtonLoader, TextButton } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({ children, loading, ...props }: ButtonProps) {
  return <TextButton disabled={loading} {...props} >
    {children}

    {loading && <ButtonLoader size="sm" />}
  </TextButton>
}