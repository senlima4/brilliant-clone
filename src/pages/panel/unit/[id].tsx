import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Box, Flex, Spinner } from "@chakra-ui/react"

import { useUnit } from "@/api/hooks"
import { SINGLETON_FUNCTION_SX } from "@/domain/panel/styles"

const PanelLayout = dynamic(() => import("@/domain/panel/layout"), { ssr: false })
const UnitEditor = dynamic(() => import("@/domain/units/editor"), { ssr: false })
const UnitContentEditor = dynamic(() => import("@/domain/units/content-editor"), { ssr: false })

const UnitPage = () => {
  const router = useRouter()
  const { status, data } = useUnit({ unitId: router.query.id as string })

  let component = (
    <Box>
      <Spinner />
    </Box>
  )

  if (status === "success") {
    component = (
      <Flex w="full" h="100%" flexDir="column">
        <Box flex="none" w="full" mb={4}>
          <UnitEditor defaultValues={data} />
        </Box>
        <Box flex="auto" h="100%">
          <UnitContentEditor unitId={data.id} defaultValue={(data.structure as string) || ""} />
        </Box>
      </Flex>
    )
  }

  return (
    <PanelLayout>
      <Box sx={SINGLETON_FUNCTION_SX}>{component}</Box>
    </PanelLayout>
  )
}

export default UnitPage
