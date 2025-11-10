import { cn } from '@/lib/utils';

export function DescriptionList({
  children,
  className,
  ...props
}: React.ComponentProps<'dl'>) {
  return (
    <dl className={cn('flex flex-col gap-4', className)} {...props}>
      {children}
    </dl>
  );
}

export function DescriptionGroup({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('grid grid-cols-3', className)} {...props}>
      {children}
    </div>
  );
}

export function DescriptionTerm({
  children,
  className,
  ...props
}: React.ComponentProps<'dt'>) {
  return (
    <dt className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </dt>
  );
}

export function DescriptionDetails({
  children,
  className,
  ...props
}: React.ComponentProps<'dd'>) {
  return (
    <dd className={cn('col-span-2', className)} {...props}>
      {children}
    </dd>
  );
}
