import * as React from "react"
import dynamic from "next/dynamic"
import { Box, Flex, Text, Center } from "@chakra-ui/react"

import { useTopics } from "@/api/hooks"

const AdminTopicUnitList = dynamic(() => import("@/domain/units/admin-topic-list"), { ssr: false })

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
        {data?.map((topic, idx) => (
          <Box key={topic.id} mb={4}>
            <Flex mb={4} align="center">
              <Center flex="none" bg="teal.50" w="30px" h="30px" rounded="full" mr={2}>
                <Text>{idx + 1}</Text>
              </Center>
              <Text flex="none" mr={2}>
                {topic.name}
              </Text>
              <Box flex="auto" w="100%" h="1px" bg="black" />
            </Flex>
            {showUnits && (
              <Box>
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
