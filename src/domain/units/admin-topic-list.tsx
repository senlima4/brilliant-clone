import * as React from "react"
import Link from "next/link"
import { Box, Text } from "@chakra-ui/react"

import { useTopicUnits } from "@/api/hooks"

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
