import { Logo } from '@/components/logo';
import { SignInButton } from '@/features/auth/sign-in-button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/app/applications');
  }

  return (
    <div className="flex min-h-svh flex-col justify-center px-6">
      <div className="absolute top-0 px-4 py-3">
        <Logo />
      </div>
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-4xl">
          Stay Organized and On Top of Your Applications
        </h1>
        <p className="mb-8">
          Are you tired of feeling overwhelmed by your job search? KeepTrack is
          here to help! Our app simplifies the job search process by keeping all
          your applications in one place, so you can focus on what really
          matters – landing your dream job.
        </p>

        <SignInButton />
      </div>
    </div>
  );
}
