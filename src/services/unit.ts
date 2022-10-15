import { Prisma, Topic, Unit } from "@prisma/client"
import prisma from "@/libs/prisma"

import type { ExecuteResult } from "./types"

type FindTopicUnitsInput = {
  topicId: number
}

export const findTopicUnits = async (input: FindTopicUnitsInput): Promise<ExecuteResult<Unit[]>> => {
  const { topicId } = input

  const units = await prisma.topic
    .findUnique({
      where: { id: topicId },
    })
    .units()

  return {
    success: true,
    status: 200,
    data: units || [],
  }
}

type FindUnitByIdInput = {
  id: string
}

export const findUnitById = async (input: FindUnitByIdInput): Promise<ExecuteResult<Unit>> => {
  const { id } = input

  const unit = await prisma.unit.findUnique({
    where: { id },
  })

  if (!unit) {
    return {
      success: false,
      status: 404,
      data: null,
    }
  }

  return {
    success: true,
    status: 200,
    data: unit,
  }
}

type CreateUnitInput = {
  topicId: number
} & Omit<Prisma.UnitCreateInput, "topic">

export const createUnit = async (input: CreateUnitInput): Promise<ExecuteResult<Unit>> => {
  const { topicId, ...unitInput } = input

  const unit = await prisma.unit.create({
    data: {
      ...unitInput,
      topic: {
        connect: {
          id: topicId,
        },
      },
    },
  })

  return {
    success: true,
    status: 200,
    data: unit,
  }
}

type UpdateUnitInput = {
  id: string
} & Omit<Prisma.UnitUpdateInput, "topic">

export const updateUnit = async (input: UpdateUnitInput): Promise<ExecuteResult<Unit>> => {
  const { id, ...unitInput } = input

  const unit = await prisma.unit.update({
    where: { id },
    data: { ...unitInput },
  })

  return {
    success: true,
    status: 200,
    data: unit,
  }
}

type DeleteUnitInput = {
  id: string
}

export const deleteUnit = async (input: DeleteUnitInput): Promise<ExecuteResult<Unit>> => {
  const { id } = input

  const unit = await prisma.unit.delete({
    where: { id },
  })

  return {
    success: true,
    status: 200,
    data: unit,
  }
}
