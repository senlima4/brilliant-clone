import { Course, Prisma } from "@prisma/client"
import prisma from "@/libs/prisma"

import type { ExecuteResult } from "./types"

type CheckCourseOwnerInput = {
  courseId: string
  userId: string
}

export const checkCourseOwner = async (input: CheckCourseOwnerInput): Promise<boolean> => {
  const { courseId, userId } = input

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { userId: true },
  })

  if (!course) return false

  return course.userId === userId
}

type FindUserCoursesInput = {
  userId: string
}

export const findUserCourses = async (input: FindUserCoursesInput): Promise<ExecuteResult<Course[]>> => {
  const { userId } = input

  const courses = await prisma.user
    .findUnique({
      where: { id: userId },
    })
    .courses({
      orderBy: {
        updatedAt: "asc",
      },
    })

  return {
    success: true,
    status: 200,
    data: courses || [],
  }
}

type FindCourseInput = {
  id: string
  userId: string
}

export const findCourseById = async (input: FindCourseInput): Promise<ExecuteResult<Course>> => {
  const { id, userId } = input

  const course = await prisma.course.findUnique({
    where: { id },
  })

  if (course.status === "DRAFT") {
    if (course.userId !== userId) {
      return {
        success: false,
        status: 404,
      }
    }
  }

  return {
    success: true,
    status: 200,
    data: course,
  }
}

type CreateCoursesInput = {
  userId: string
} & Omit<Prisma.CourseCreateInput, "user" | "topics">

export const createCourse = async (input: CreateCoursesInput): Promise<ExecuteResult<Course>> => {
  const { userId, ...courseInput } = input

  const existCourses = await prisma.user
    .findUnique({
      where: { id: userId },
    })
    .courses()

  if (existCourses.length >= 5) {
    return {
      success: false,
      status: 400,
    }
  }

  const course = await prisma.course.create({
    data: {
      ...courseInput,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return {
    success: true,
    status: 200,
    data: course,
  }
}

type UpdateCourseInput = {
  id: string
  userId: string
} & Omit<Prisma.CourseUpdateInput, "user" | "topics">

export const updateCourse = async (input: UpdateCourseInput): Promise<ExecuteResult<Course>> => {
  const { id, userId, ...courseInput } = input

  const isOwner = await checkCourseOwner({
    courseId: id,
    userId,
  })

  if (!isOwner) {
    return {
      success: false,
      status: 401,
    }
  }

  const course = await prisma.course.update({
    where: { id },
    data: { ...courseInput },
  })

  return {
    success: true,
    status: 200,
    data: course,
  }
}

type DeleteCourseInput = {
  id: string
  userId: string
}

export const deleteCourse = async (input: DeleteCourseInput): Promise<ExecuteResult<Course>> => {
  const { id, userId } = input

  const isOwner = await checkCourseOwner({
    courseId: id,
    userId,
  })

  if (!isOwner) {
    return {
      success: false,
      status: 401,
    }
  }

  const course = await prisma.course.delete({
    where: { id },
  })

  return {
    success: true,
    status: 200,
    data: course,
  }
}
