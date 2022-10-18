import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormControl, Input, FormLabel, Textarea, Button } from "@chakra-ui/react"

import { useCreateTopic } from "@/api/hooks"
import { CreateTopicInput } from "@/api/types"

type TopicCreatorProps = {
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
      <FormControl>
        <FormLabel>Topic Name</FormLabel>
        <Input {...register("name")} />
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

export default React.memo(TopicCreator)
