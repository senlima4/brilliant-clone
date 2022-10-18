import * as React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Box } from "@chakra-ui/react"

import { useUnit } from "@/api/hooks"

const UnitMetadataEditor = dynamic(() => import("@/domain/units/editor"), { ssr: false })
const UnitContentEditor = dynamic(() => import("@/domain/units/content-editor"), { ssr: false })

const UnitPage = () => {
  const id = useRouter().query.id as string
  const { status, data } = useUnit({ unitId: id })

  let component = <Box>Loading...</Box>

  if (status === "success") {
    component = (
      <Box>
        <UnitMetadataEditor defaultValues={data} />
        <UnitContentEditor unitId={data.id} defaultValue={data.structure as string} />
      </Box>
    )
  }

  return component
}

export default UnitPage
