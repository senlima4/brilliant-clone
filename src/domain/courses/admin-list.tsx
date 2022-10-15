import * as React from "react"
import Link from "next/link"
import { Box, Text } from "theme-ui"

import { useCourses } from "@/api/hooks"

const AdminCourseList: React.FC = () => {
  const { isLoading, data } = useCourses()

  if (isLoading) {
    return <Box>Loading...</Box>
  }
  return (
    <Box>
      {data?.map((course) => (
        <Box key={course.id}>
          <Text>{course.name}</Text>
          <Link href={`/panel/courses/${course.id}`}>Go to edit</Link>
        </Box>
      ))}
    </Box>
  )
}

export default React.memo(AdminCourseList)
