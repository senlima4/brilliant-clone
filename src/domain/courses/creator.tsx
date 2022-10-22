import * as React from "react"
import { useForm } from "react-hook-form"
import { Box, Flex, FormLabel, FormControl, Input, Textarea, Select, Button } from "@chakra-ui/react"

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
      <FormControl mb={2}>
        <FormLabel w="80px" flex="none">
          Slug
        </FormLabel>
        <Input size="sm" {...register("slug")} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel w="80px" flex="none">
          Name
        </FormLabel>
        <Input size="sm" {...register("name")} />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel>Description</FormLabel>
        <Textarea size="sm" rows={3} {...register("description")} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="status" w="80px" flex="none">
          Status
        </FormLabel>
        <Select size="sm" {...register("status")}>
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
