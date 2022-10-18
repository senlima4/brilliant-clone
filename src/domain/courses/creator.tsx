import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, FormLabel, FormControl, Input, Textarea, Select, Button } from "@chakra-ui/react"

import { useCreateCourse } from "@/api/hooks"
import type { CreateCourseInput } from "@/api/types"

type CourseCreatorProps = {
  children?: React.ReactNode
}

const CourseEditor: React.FC<CourseCreatorProps> = () => {
  const mutation = useCreateCourse()
  const { register, handleSubmit } = useForm<CreateCourseInput>()

  const onSubmit = (data: CreateCourseInput) => {
    mutation.mutate(data)
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
        Create Course
      </Button>
    </Box>
  )
}

export default React.memo(CourseEditor)
