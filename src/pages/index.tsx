import NextLink from "next/link"
import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Box, Link, Button } from "theme-ui"
import type { NextPage } from "next"

const Index: NextPage = () => {
  const { status } = useSession()
  return (
    <Box>
      <Box>
        <Button onClick={() => signIn()}>Auth</Button>
      </Box>
      {status === "authenticated" && (
        <Box>
          <Button onClick={() => signOut()}>Logout</Button>
        </Box>
      )}
      <NextLink href="/panel" passHref>
        <Link>Panel</Link>
      </NextLink>
    </Box>
  )
}

export default Index
