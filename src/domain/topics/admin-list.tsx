import * as React from "react"
import dynamic from "next/dynamic"
import { Box, Text } from "@chakra-ui/react"

import { useTopics } from "@/api/hooks"

const AdminTopicUnitList = dynamic(() => import("@/domain/units/admin-topic-list"), { ssr: false })
const UnitCreator = dynamic(() => import("@/domain/units/creator"), { ssr: false })

type AdminTopicListProps = {
  courseId: string
  showUnits?: boolean
}

const AdminTopicList: React.FC<AdminTopicListProps> = ({ courseId, showUnits = false }) => {
  const { status, data } = useTopics({ courseId })

  let component = <Box>Loading...</Box>

  if (status === "success") {
    component = (
      <Box>
        {data?.map((topic) => (
          <Box key={topic.id}>
            <Text>{topic.name}</Text>
            {showUnits && (
              <Box>
                <Text>Creator unit</Text>
                <UnitCreator topicId={topic.id} />
                <AdminTopicUnitList topicId={topic.id} />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    )
  }

  return component
}

export default React.memo(AdminTopicList)
