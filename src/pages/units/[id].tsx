import * as React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Box, Text } from "theme-ui"

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
        <UnitContentEditor defaultValue={data.structure as string} />
      </Box>
    )
  }

  return component
}

export default UnitPage
