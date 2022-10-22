import type { CourseStatus, UnitStatus } from "@prisma/client"

export type SerializedCourse = {
  id: string
  slug: string
  name: string
  description?: string | null
  image?: string | null
  status: CourseStatus
  createdAt: string
  updatedAt: string
}

export type CreateCourseInput = {
  slug: string
  name: string
  description?: string
  image?: string
  status?: CourseStatus
}

export type UpdateCourseInput = {
  courseId: string
} & Partial<CreateCourseInput>

export type DeleteCourseInput = {
  courseId: string
}

export type CreateTopicInput = {
  courseId: string
  name: string
  description?: string
}

export type UpdateTopicInput = {
  topicId: number
} & Partial<CreateTopicInput>

export type DeleteTopicInput = {
  topicId: number
}

export type CreateUnitInput = {
  topicId: number
  title: string
  status?: UnitStatus
  description?: string
}

export type UpdateUnitInput = {
  unitId: string
  structure?: string
} & Partial<CreateUnitInput>

export type DeleteUnitInput = {
  unitId: string
}
