import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { respExecuteResult } from "@/services/utils"
import { checkCourseOwner } from "@/services/course"
import { updateTopic, deleteTopic, getTopicById } from "@/services/topic"

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
    return respExecuteResult(res, getTopicResult)
  }

  if (req.method === "PUT") {
    try {
      const result = await updateTopic({
        id: topicId,
        ...req.body,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  if (req.method === "DELETE") {
    try {
      const result = await deleteTopic({
        id: topicId,
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
