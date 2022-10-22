import dynamic from "next/dynamic"
import { Box } from "@chakra-ui/react"
import type { NextPage } from "next"

const Navbar = dynamic(() => import("@/domain/landing/navbar"), {
  ssr: false,
})

const Index: NextPage = () => {
  return (
    <Box>
      <Box mx="auto" w="98%" maxW={{ base: "375px", md: "960px", lg: "1200px" }}>
        <Navbar />
      </Box>
    </Box>
  )
}

export default Index
