import { Logo } from '@/components/Logo';
import { SignInButton } from '@/features/auth/SignInButton';
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
    <div className="min-h-svh flex flex-col justify-center px-6">
      <div className="absolute top-0 py-3 px-4">
        <Logo />
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl mb-6">
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
