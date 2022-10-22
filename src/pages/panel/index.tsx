import dynamic from "next/dynamic"
import { Box, Heading } from "@chakra-ui/react"
import type { NextPage } from "next"

const PanelLayout = dynamic(() => import("@/domain/panel/layout"), { ssr: false })
const AdminCourseList = dynamic(() => import("@/domain/courses/admin-list"), { ssr: false })

const COURSE_LIST_SX = {
  my: 6,
  width: "80%",
  maxW: { base: "375px", sm: "600px", md: "960px", lg: "1200px" },
}

const PanelPage: NextPage = () => {
  return (
    <Box>
      <PanelLayout>
        <Box as="section" sx={COURSE_LIST_SX}>
          <Heading mb={4} size="md">
            Your Courses List
          </Heading>
          <AdminCourseList />
        </Box>
      </PanelLayout>
    </Box>
  )
}

export default PanelPage
