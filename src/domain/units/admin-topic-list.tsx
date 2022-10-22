import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { FiPlus } from "react-icons/fi"
import { Box, Text, Heading, LinkOverlay, LinkBox, Grid, GridItem, IconButton } from "@chakra-ui/react"

import { useTopicUnits } from "@/api/hooks"

const UnitCreator = dynamic(() => import("@/domain/units/creator"), { ssr: false })

type AdminTopicUnitListProps = {
  topicId: number
}

const AdminTopicUnitList: React.FC<AdminTopicUnitListProps> = ({ topicId }) => {
  const [isOpenCreator, setIsOpenCreator] = React.useState(false)
  const { isLoading, data } = useTopicUnits({ topicId })

  if (isLoading) {
    return <Box>Loading...</Box>
  }
  return (
    <Grid w="full" templateColumns="repeat(4, 1fr)" gap={4}>
      {data?.map((unit) => (
        <LinkBox as={GridItem} key={unit.id} w="100%" p={4} border="1px" borderColor="gray.200" rounded="md">
          <Box w="full" h="160px" border="1px" />
          <Link href={`/panel/unit/${unit.id}`} passHref>
            <LinkOverlay>
              <Heading mt={4} mb={2} size="sm">
                {unit.title}
              </Heading>
            </LinkOverlay>
          </Link>
          <Text>{unit.description ?? "No unit description"}</Text>
        </LinkBox>
      ))}
      {isOpenCreator ? (
        <GridItem w="100%" p={4} border="1px" borderColor="gray.100" rounded="md">
          <UnitCreator topicId={topicId} cancelable onCancel={() => setIsOpenCreator(false)} />
        </GridItem>
      ) : (
        <GridItem>
          <IconButton
            w="100%"
            h="100%"
            variant="outline"
            aria-label="Create unit"
            icon={<FiPlus />}
            onClick={() => setIsOpenCreator(true)}
            size="md"
          />
        </GridItem>
      )}
    </Grid>
  )
}

export default React.memo(AdminTopicUnitList)
