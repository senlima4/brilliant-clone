import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Text, Field, Textarea, Button } from "theme-ui"

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
      <Field label="Name" {...register("name")} />
      <Field label="Description" {...register("description")} as={Textarea} />
      {mutation.status === "loading" ? <Text>Loading...</Text> : <Button type="submit">Create Topic</Button>}
    </Box>
  )
}

export default React.memo(TopicCreator)
