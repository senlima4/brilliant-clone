import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Text, Label, Field, Textarea, Select, Button } from "theme-ui"
import type { Course } from "@prisma/client"

import { useEditCourse } from "@/api/hooks"
import { UpdateCourseInput } from "@/api/types"

type CourseEditorProps = {
  defaultValues: Course
  children?: React.ReactNode
}

const CourseEditor: React.FC<CourseEditorProps> = ({ defaultValues }) => {
  const mutation = useEditCourse()
  const { register, handleSubmit } = useForm<UpdateCourseInput>({
    defaultValues,
  })

  const onSubmit = (data: UpdateCourseInput) => {
    mutation.mutate({ courseId: defaultValues.id, ...data })
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
      {mutation.status === "loading" ? <Text>Loading...</Text> : <Button type="submit">Edit Course</Button>}
    </Box>
  )
}

export default React.memo(CourseEditor)
