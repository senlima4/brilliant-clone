import type { Course, Topic, Unit } from "@prisma/client"

import API from "./instance"
import type {
  CreateCourseInput,
  UpdateCourseInput,
  DeleteCourseInput,
  CreateTopicInput,
  UpdateTopicInput,
  DeleteTopicInput,
  CreateUnitInput,
  UpdateUnitInput,
  DeleteUnitInput,
} from "./types"

const COURSE_FETCHER = {
  getCourses: async () => {
    const { data } = await API.get("/courses")
    return data as Course[]
  },
  getCourse: async (courseId: string) => {
    const { data } = await API.get(`/courses/${courseId}`)
    return data as Course
  },
  createCourse: async (input: CreateCourseInput) => {
    const { data } = await API.post("/courses", input)
    return data as Course
  },
  updateCourse: async (input: UpdateCourseInput) => {
    const { courseId } = input
    const { data } = await API.put(`/courses/${courseId}`, input)
    return data as Course
  },
  deleteCourse: async (input: DeleteCourseInput) => {
    const { courseId } = input
    const { data } = await API.delete(`/courses/${courseId}`)
    return data as Course
  },
}

const TOPIC_FETCHER = {
  getTopic: async (topicId: number) => {
    const { data } = await API.get(`/topics/${topicId}`)
    return data as Topic
  },
  createTopic: async (input: CreateTopicInput) => {
    const { courseId } = input
    const { data } = await API.post(`/courses/${courseId}/topics`, input)
    return data as Topic
  },
  updateTopic: async (input: UpdateTopicInput) => {
    const { topicId } = input
    const { data } = await API.put(`/topics/${topicId}`, input)
    return data as Topic
  },
  deleteTopic: async (input: DeleteTopicInput) => {
    const { topicId } = input
    const { data } = await API.delete(`/topics/${topicId}`)
    return data as Topic
  },
}

const UNIT_FETCHER = {
  getUnit: async (id: string) => {
    const { data } = await API.get(`/units/${id}`)
    return data as Unit
  },
  updateUnit: async (input: UpdateUnitInput) => {
    const { unitId, ...updateInput } = input
    const { data } = await API.put(`/units/${unitId}`, updateInput)
    return data as Unit
  },
  deleteUnit: async (input: DeleteUnitInput) => {
    const { data } = await API.delete(`/units/${input.unitId}`)
    return data as Unit
  },
}

export const FETCHER = {
  ...COURSE_FETCHER,
  ...TOPIC_FETCHER,
  ...UNIT_FETCHER,

  getCourseTopics: async (courseId: string) => {
    const { data } = await API.get(`/courses/${courseId}/topics`)
    return data as Topic[]
  },
  getTopicUnits: async ({ topicId }: { topicId: number }) => {
    const { data } = await API.get(`/topics/${topicId}/units`)
    return data as Unit[]
  },

  createCourseTopic: async (input: CreateTopicInput) => {
    const { courseId } = input
    const { data } = await API.post(`/courses/${courseId}/topics`, input)
    return data as Topic
  },
  createTopicUnit: async (input: CreateUnitInput) => {
    const { topicId } = input
    const { data } = await API.post(`/topics/${topicId}/units`, input)
    return data as Unit
  },

  getSession: async () => {
    try {
      const { data } = await API.get("/auth/session")
      return Object.keys(data).length > 0
    } catch {
      return null
    }
  },
}
