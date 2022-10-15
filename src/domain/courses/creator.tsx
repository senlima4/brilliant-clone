import * as React from "react"
import noop from "lodash/noop"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { Box, Text, Label, Field, Textarea, Select, Button } from "theme-ui"

import { FETCHER } from "@/api/fetcher"
import type { CreateCourseInput } from "@/api/types"

type CourseCreatorProps = {
  onSuccess?: () => void
  children?: React.ReactNode
}

const CourseEditor: React.FC<CourseCreatorProps> = ({ onSuccess = noop }) => {
  const mutation = useMutation(FETCHER.createCourse)
  const { register, handleSubmit } = useForm<CreateCourseInput>()

  const onSubmit = (data: CreateCourseInput) => {
    mutation.mutate(data, { onSuccess })
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Slug" {...register("slug")} />
      <Field label="Name" {...register("name")} />
      <Field label="Description" {...register("description")} as={Textarea} />
      <Box>
        <Label htmlFor="status">Status</Label>
        <Select {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="LINK">Link Only</option>
          <option value="PUBLIC">Public</option>
        </Select>
      </Box>
      {mutation.status === "loading" ? <Text>Loading...</Text> : <Button type="submit">Create Course</Button>}
    </Box>
  )
}

export default React.memo(CourseEditor)
