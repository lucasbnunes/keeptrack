import { AnimatedLoader } from "./style";

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
  return <AnimatedLoader size={size} className={className} />;
} 