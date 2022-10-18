import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"

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
    mutation.mutate({ topicId, ...data })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Unit Title</FormLabel>
        <Input {...register("title")} />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea rows={3} {...register("description")} />
      </FormControl>

      <Button type="submit" isLoading={mutation.isLoading}>
        Create
      </Button>
    </Box>
  )
}

export default React.memo(UnitCreator)
