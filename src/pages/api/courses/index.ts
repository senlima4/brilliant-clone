import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { respExecuteResult } from "@/services/utils"
import { findUserCourses, createCourse } from "@/services/course"

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    try {
      const result = await findUserCourses({
        userId: session.user.id,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const result = await createCourse({
        userId: session.user.id,
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
