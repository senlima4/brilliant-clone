import * as React from "react"
import { Box, Text } from "theme-ui"

import { useTopicUnits } from "@/api/hooks"
import Link from "next/link"

type AdminTopicUnitListProps = {
  topicId: number
}

const AdminTopicUnitList: React.FC<AdminTopicUnitListProps> = ({ topicId }) => {
  const { isLoading, data } = useTopicUnits({ topicId })

  if (isLoading) {
    return <Box>Loading...</Box>
  }
  return (
    <Box>
      {data?.map((unit) => (
        <Box key={unit.id}>
          <Text>{unit.title}</Text>
          <Link href={`/panel/unit/${unit.id}`}>Go to edit</Link>
        </Box>
      ))}
    </Box>
  )
}

export default React.memo(AdminTopicUnitList)
