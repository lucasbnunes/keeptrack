
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loader } from "../Loader";
import { LoaderContainer } from "./style";
import { Header } from "@/features/navigation/Header";

interface LayoutProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

export function Layout({ children, isPublic = true }: LayoutProps) {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <LoaderContainer>
        <Loader size="lg" />
      </LoaderContainer>
    )
  }

  if (!isPublic && status === 'unauthenticated') {
    router.push('/')
  }

  if (isPublic && status === 'authenticated') {
    router.push('/applications')
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