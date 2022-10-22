import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Flex, FormControl, Select, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"
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
      <FormControl mb={2}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title", { required: true })} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Textarea rows={3} {...register("description")} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="status">Status</FormLabel>
        <Select {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLIC">Public</option>
        </Select>
      </FormControl>

      <Flex w="full">
        <Button ml="auto" size="sm" type="submit" isLoading={mutation.isLoading}>
          Update
        </Button>
      </Flex>
    </Box>
  )
}

export default React.memo(UnitEditor)
