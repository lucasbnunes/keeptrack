'use client';

import Link from 'next/link';

interface LogoProps {
  href?: string;
}
export function Logo({ href = '/app/applications' }: LogoProps) {
  return (
    <Link href={href}>
      <h1 className="text-3xl font-bold">
        Keep<span className="text-muted-foreground">Track</span>
      </h1>
    </Link>
  );
}
