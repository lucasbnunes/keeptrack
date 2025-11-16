import { Logo } from '@/components/logo';
import { SignInButton } from '@/features/auth/sign-in-button';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { CheckCircle2, BarChart3, Calendar, Zap } from 'lucide-react';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/app/applications');
  }

  return (
    <div className="from-background via-background to-secondary/5 min-h-svh bg-linear-to-br">
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-32">
        <div className="text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-2 text-sm font-medium">
            Job Search Made Simple
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Track Your Job Applications
            <span className="from-primary to-primary/60 block bg-linear-to-r bg-clip-text text-transparent">
              with Clarity
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg">
            Stay organized throughout your job search. Manage applications,
            track statuses, and never miss an opportunity. All in one beautiful,
            intuitive dashboard.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignInButton />
          </div>
        </div>
      </section>

      <section className="border-border/40 bg-secondary/30 border-t py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Everything you need to manage your job search efficiently
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-border bg-card hover:border-primary/50 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="bg-primary/10 mb-4 inline-block rounded-lg p-3">
                <BarChart3 className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 font-semibold">
                Kanban Board
              </h3>
              <p className="text-muted-foreground text-sm">
                Visualize your applications across different statuses at a
                glance
              </p>
            </div>

            <div className="border-border bg-card hover:border-primary/50 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="bg-primary/10 mb-4 inline-block rounded-lg p-3">
                <Calendar className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 font-semibold">
                Track Dates
              </h3>
              <p className="text-muted-foreground text-sm">
                Keep important dates organized – applications, interviews, and
                deadlines
              </p>
            </div>

            <div className="border-border bg-card hover:border-primary/50 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="bg-primary/10 mb-4 inline-block rounded-lg p-3">
                <CheckCircle2 className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 font-semibold">
                Stay Focused
              </h3>
              <p className="text-muted-foreground text-sm">
                Eliminate the overwhelm by centralizing all your job search data
              </p>
            </div>

            <div className="border-border bg-card hover:border-primary/50 rounded-lg border p-6 transition-all hover:shadow-md">
              <div className="bg-primary/10 mb-4 inline-block rounded-lg p-3">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-foreground mb-2 font-semibold">
                Quick Setup
              </h3>
              <p className="text-muted-foreground text-sm">
                Sign in with Google and start tracking your applications
                instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="border-border/40 from-primary/5 to-primary/10 rounded-xl border bg-linear-to-br px-8 py-16 text-center sm:py-20">
          <h2 className="mb-4 text-3xl font-bold">Ready to Stay Organized?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Take control of your job search today. Sign in now and start
            managing your applications like a pro.
          </p>
          <SignInButton />
        </div>
      </section>
    </div>
  );
}
