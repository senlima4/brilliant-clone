import * as React from "react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { Box, Text, Badge } from "@chakra-ui/react"

import { useCourses } from "@/api/hooks"

type AdminCourseListProps = {
  onSelect?: (courseId: string) => void
}

const AdminCourseList: React.FC<AdminCourseListProps> = ({ onSelect }) => {
  const { data = [] } = useCourses()
  const router = useRouter()

  const handleSelect = React.useCallback(
    (courseId: string) => () => {
      if (onSelect) {
        onSelect(courseId)
      }
      router.push(`/panel/course/${courseId}`)
    },
    [onSelect, router]
  )

  let component = <Box>Loading...</Box>

  if (data.length) {
    component = (
      <Box>
        {data.map((course) => (
          <Box key={course.id} onClick={handleSelect(course.id)}>
            <Text as="p">{course.name}</Text>
            <Badge>{course.status}</Badge>
            <Text sx={{ fontSize: 1 }}>{format(new Date(course.createdAt), "yyyy-MM-dd")}</Text>
          </Box>
        ))}
      </Box>
    )
  }

  return component
}

export default React.memo(AdminCourseList)
