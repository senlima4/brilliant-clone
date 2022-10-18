import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"
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
      <FormControl>
        <FormLabel>Unit Title</FormLabel>
        <Input {...register("title")} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea rows={3} {...register("description")} />
      </FormControl>

      <Button type="submit" isLoading={mutation.isLoading}>
        Update Unit
      </Button>
    </Box>
  )
}

export default React.memo(UnitEditor)
