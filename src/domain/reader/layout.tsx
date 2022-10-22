import * as React from "react"
import dynamic from "next/dynamic"
import { Box, Flex, SystemStyleObject } from "@chakra-ui/react"
import type { NextPage } from "next"

const Navbar = dynamic(() => import("./navbar"), { ssr: false })

const CONTAINER_SX: SystemStyleObject = {
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
}

type PanelLayoutProps = {
  children: React.ReactNode
}

const PanelLayout: NextPage<PanelLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Flex as="main" sx={CONTAINER_SX}>
        {children}
      </Flex>
    </Box>
  )
}

export default React.memo(PanelLayout)
