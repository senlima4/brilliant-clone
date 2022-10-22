import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"

import { useCreateTopic } from "@/api/hooks"
import { CreateTopicInput } from "@/api/types"

export type TopicCreatorProps = {
  courseId: string
}

const TopicCreator: React.FC<TopicCreatorProps> = ({ courseId }) => {
  const mutation = useCreateTopic()
  const { register, handleSubmit } = useForm<CreateTopicInput>()

  const onSubmit = (data: CreateTopicInput) => {
    mutation.mutate({ courseId, ...data })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={2}>
        <FormLabel>Name</FormLabel>
        <Input size="sm" {...register("name")} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Input size="sm" {...register("description")} />
      </FormControl>

      <Button size="sm" type="submit" isLoading={mutation.isLoading}>
        Submit
      </Button>
    </Box>
  )
}

export default React.memo(TopicCreator)
