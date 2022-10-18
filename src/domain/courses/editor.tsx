import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormLabel, FormControl, Input, Textarea, Select, Button } from "@chakra-ui/react"
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
      <FormControl>
        <FormLabel>Slug</FormLabel>
        <Input {...register("slug")} />
      </FormControl>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea rows={3} {...register("description")} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="status">Status</FormLabel>
        <Select {...register("status")}>
          <option value="DRAFT">Draft</option>
          <option value="LINK">Link Only</option>
          <option value="PUBLIC">Public</option>
        </Select>
      </FormControl>

      <Button type="submit" isLoading={mutation.status === "loading"}>
        Update Course
      </Button>
    </Box>
  )
}

export default React.memo(CourseEditor)
