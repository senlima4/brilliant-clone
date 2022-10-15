import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"

import { respExecuteResult } from "@/services/utils"
import { getTopicById } from "@/services/topic"
import { checkCourseOwner } from "@/services/course"
import { findTopicUnits, createUnit } from "@/services/unit"

const handler: NextApiHandler = async (req, res) => {
  const topicId = +(req.query.topicId as string)
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const getTopicResult = await getTopicById(topicId)

  if (!getTopicResult.data) {
    return res.status(404).end()
  }

  const isCourseOwner = await checkCourseOwner({
    courseId: getTopicResult.data.courseId,
    userId: session.user.id,
  })

  if (!isCourseOwner) {
    return res.status(403).end()
  }

  if (req.method === "GET") {
    try {
      const result = await findTopicUnits({
        topicId,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const result = await createUnit({
        topicId,
        ...req.body,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  return res.status(405).end()
}

export default handler
