import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Flex, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"

import { useCreateUnit } from "@/api/hooks"
import type { CreateUnitInput } from "@/api/types"

type UnitEditorProps = {
  topicId: number
  cancelable?: boolean
  onCancel?: () => void
  children?: React.ReactNode
}

const UnitCreator: React.FC<UnitEditorProps> = ({ topicId, onCancel, cancelable }) => {
  const mutation = useCreateUnit()
  const { register, handleSubmit } = useForm<CreateUnitInput>()

  const onSubmit = (data: CreateUnitInput) => {
    mutation.mutate({ topicId, ...data })
  }

  const handleCancel = React.useCallback(() => {
    if (onCancel) {
      onCancel()
    }
  }, [onCancel])

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={1}>
        <FormLabel>Title</FormLabel>
        <Input size="sm" {...register("title")} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Textarea size="sm" rows={3} {...register("description")} />
      </FormControl>

      <Flex w="full" align="center">
        <Button flex={1} mr={2} size="sm" type="submit" isLoading={mutation.isLoading}>
          Create
        </Button>
        {cancelable && (
          <Button flex={1} size="sm" disabled={mutation.isLoading} onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default React.memo(UnitCreator)
