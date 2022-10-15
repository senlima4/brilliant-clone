import { Prisma, Topic } from "@prisma/client"
import prisma from "@/libs/prisma"

import type { ExecuteResult } from "./types"

export const getTopicById = async (id: number): Promise<ExecuteResult<Topic>> => {
  const topic = await prisma.topic.findUnique({
    where: { id },
  })

  return {
    success: true,
    status: 200,
    data: topic,
  }
}

type FindCourseTopicsInput = {
  courseId: string
}

export const findCourseTopics = async (input: FindCourseTopicsInput): Promise<ExecuteResult<Topic[]>> => {
  const { courseId } = input

  const topics = await prisma.course
    .findUnique({
      where: { id: courseId },
    })
    .topics()

  return {
    success: true,
    status: 200,
    data: topics || [],
  }
}

type CreateTopicInput = {
  courseId: string
} & Omit<Prisma.TopicCreateInput, "units" | "course">

export const createTopic = async (input: CreateTopicInput): Promise<ExecuteResult<Topic>> => {
  const { courseId, ...topicInput } = input

  const topic = await prisma.topic.create({
    data: {
      ...topicInput,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  })

  return {
    success: true,
    status: 200,
    data: topic,
  }
}

type UpdateTopicInput = {
  id: number
} & Omit<Prisma.TopicUpdateInput, "units" | "course">

export const updateTopic = async (input: UpdateTopicInput): Promise<ExecuteResult<Topic>> => {
  const { id, ...topicInput } = input

  const topic = await prisma.topic.update({
    where: { id },
    data: { ...topicInput },
  })

  return {
    success: true,
    status: 200,
    data: topic,
  }
}

type DeleteTopicInput = {
  id: number
}

export const deleteTopic = async (input: DeleteTopicInput): Promise<ExecuteResult<Topic>> => {
  const { id } = input

  const topic = await prisma.topic.delete({
    where: { id },
  })

  return {
    success: true,
    status: 200,
    data: topic,
  }
}
