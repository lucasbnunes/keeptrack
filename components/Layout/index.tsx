import { Header } from "@/features/navigation/Header/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

export function Layout({ children, isPublic = true }: LayoutProps) {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <>
      {!isPublic && <Header />}

      <main>
        {children}
      </main>
    </>
  )
}