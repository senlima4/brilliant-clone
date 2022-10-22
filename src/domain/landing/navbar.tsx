import * as React from "react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { Flex, Heading, Button } from "@chakra-ui/react"

import { OPEN_EDIT_ACCESS } from "@/constants"

const Navbar: React.FC = () => {
  const { status, data } = useSession()

  return (
    <Flex w="full" p={6} alignItems="center" justifyContent="space-between">
      <Heading size="lg" fontWeight="medium" textTransform="capitalize">
        Brilliant Clone
      </Heading>

      {status === "authenticated" ? (
        <Link href={OPEN_EDIT_ACCESS.includes(data.user.role) ? "/panel" : "/"} passHref>
          <Button as="a" variant="outline">
            Dashboard
          </Button>
        </Link>
      ) : (
        <Button variant="outline" onClick={() => signIn()}>
          Log in
        </Button>
      )}
    </Flex>
  )
}

export default React.memo(Navbar)
