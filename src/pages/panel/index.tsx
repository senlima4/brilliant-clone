import dynamic from "next/dynamic"
import { useQueryClient } from "@tanstack/react-query"
import { Box, Heading } from "theme-ui"
import type { NextPage } from "next"
import type { Session } from "next-auth"

const AdminCourseList = dynamic(() => import("@/domain/courses/admin-list"), { ssr: false })
const CourseCreator = dynamic(() => import("@/domain/courses/creator"), { ssr: false })

const PanelPage: NextPage<{ session: Session }> = () => {
  const queryClient = useQueryClient()
  return (
    <Box>
      <Heading>Panel</Heading>

      <Box mt="10px">
        <CourseCreator
          onSuccess={() => {
            queryClient.invalidateQueries(["courses"])
          }}
        />
        <AdminCourseList />
      </Box>
    </Box>
  )
}

export default PanelPage
