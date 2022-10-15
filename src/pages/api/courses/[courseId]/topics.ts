import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"

import { respExecuteResult } from "@/services/utils"
import { findCourseTopics, createTopic } from "@/services/topic"

const handler: NextApiHandler = async (req, res) => {
  const courseId = req.query.courseId as string
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    try {
      const result = await findCourseTopics({
        courseId,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const result = await createTopic({
        courseId,
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
