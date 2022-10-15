import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Field, Textarea, Button } from "theme-ui"

import { useCreateUnit } from "@/api/hooks"
import type { CreateUnitInput } from "@/api/types"

type UnitEditorProps = {
  topicId: number
  children?: React.ReactNode
}

const UnitCreator: React.FC<UnitEditorProps> = ({ topicId }) => {
  const mutation = useCreateUnit()
  const { register, handleSubmit } = useForm<CreateUnitInput>()

  const onSubmit = (data: CreateUnitInput) => {
    console.log(data)
    mutation.mutate({ topicId, ...data })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Title" {...register("title")} />
      <Field label="Description" {...register("description")} as={Textarea} />
      {mutation.isLoading ? <Box>Loading...</Box> : <Button type="submit">Create</Button>}
    </Box>
  )
}

export default React.memo(UnitCreator)
