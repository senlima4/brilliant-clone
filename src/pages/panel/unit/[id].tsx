import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Box, Heading, Spinner } from "theme-ui"

import { useUnit } from "@/api/hooks"

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
      <Box>
        <UnitEditor defaultValues={data} />
        <UnitContentEditor unitId={data.id} defaultValue={(data.structure as string) || ""} />
      </Box>
    )
  }

  return (
    <Box>
      <Heading>Unit</Heading>
      <Box>{component}</Box>
    </Box>
  )
}

export default UnitPage
