import * as React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Box, Flex, Heading, Button } from "@chakra-ui/react"

const ReaderNavbar: React.FC = () => {
  return (
    <Box w="full" borderBottom="1px">
      <Flex
        mx="auto"
        w="98%"
        maxW={{ base: "375px", md: "960px", lg: "1200px" }}
        p={3}
        alignItems="center"
        justifyContent="space-between">
        <Link href="/">
          <Heading size="lg" fontWeight="medium" textTransform="capitalize">
            Brilliant Clone
          </Heading>
        </Link>

        <Button size="sm" variant="outline" onClick={() => signOut()}>
          Log out
        </Button>
      </Flex>
    </Box>
  )
}

export default React.memo(ReaderNavbar)
