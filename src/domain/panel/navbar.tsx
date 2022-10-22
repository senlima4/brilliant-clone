import * as React from "react"
import { signOut } from "next-auth/react"
import { Box, Flex, Heading, Button } from "@chakra-ui/react"

const PanelNavbar: React.FC = () => {
  return (
    <Box w="full" borderBottom="1px">
      <Flex
        mx="auto"
        w="98%"
        maxW={{ base: "375px", md: "960px", lg: "1200px" }}
        p={3}
        alignItems="center"
        justifyContent="space-between">
        <Heading size="lg" fontWeight="medium" textTransform="capitalize">
          Brilliant Clone
        </Heading>

        <Button size="sm" variant="outline" onClick={() => signOut()}>
          Log out
        </Button>
      </Flex>
    </Box>
  )
}

export default React.memo(PanelNavbar)
