import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { respExecuteResult } from "@/services/utils"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { updateCourse, deleteCourse, findCourseById } from "@/services/course"

const handler: NextApiHandler = async (req, res) => {
  const courseId = req.query.courseId as string
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    const result = await findCourseById({
      id: courseId,
      userId: session.user.id,
    })

    return respExecuteResult(res, result)
  }

  if (req.method === "PUT") {
    try {
      const result = await updateCourse({
        id: courseId,
        userId: session.user.id,
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
      const result = await deleteCourse({
        id: courseId,
        userId: session.user.id,
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
