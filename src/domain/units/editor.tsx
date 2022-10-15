import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Field, Textarea, Button } from "theme-ui"
import type { Unit } from "@prisma/client"

import { useEditUnit } from "@/api/hooks"
import { UpdateUnitInput } from "@/api/types"

type UnitEditorProps = {
  defaultValues: Unit
  children?: React.ReactNode
}

const UnitEditor: React.FC<UnitEditorProps> = ({ defaultValues }) => {
  const mutation = useEditUnit()
  const { register, handleSubmit } = useForm<UpdateUnitInput>({
    defaultValues: { ...defaultValues, structure: defaultValues.structure as string },
  })

  const onSubmit = (data: UpdateUnitInput) => {
    mutation.mutate(data)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Title" {...register("title")} />
      <Field label="Description" {...register("description")} as={Textarea} />
      <Button type="submit">Update Unit</Button>
    </Box>
  )
}

export default React.memo(UnitEditor)
