import dynamic from "next/dynamic"
import { useQueryClient } from "@tanstack/react-query"
import { Box, Flex, Heading, ThemeUIStyleObject } from "@chakra-ui/react"
import type { NextPage } from "next"
import type { Session } from "next-auth"

const AdminCourseList = dynamic(() => import("@/domain/courses/admin-list"), { ssr: false })
const CourseCreator = dynamic(() => import("@/domain/courses/creator"), { ssr: false })

const CONTAINER_SX: ThemeUIStyleObject = {
  width: "100vw",
  height: "100vh",
}

const COURSE_LIST_SX: ThemeUIStyleObject = {
  flex: "none",
  width: "300px",
  borderRight: "1px solid",
  padding: "0 1rem",
}

const COURSE_EDITOR_SX: ThemeUIStyleObject = {
  flex: "auto",
  width: "100%",
}

const PanelPage: NextPage<{ session: Session }> = () => {
  return (
    <Box>
      <Flex sx={CONTAINER_SX}>
        <Box sx={COURSE_LIST_SX}>
          <CourseCreator />
          <AdminCourseList />
        </Box>
        <Box sx={COURSE_EDITOR_SX}></Box>
      </Flex>
    </Box>
  )
}

export default PanelPage
