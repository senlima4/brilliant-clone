import { unstable_getServerSession } from "next-auth/next"
import type { NextApiHandler } from "next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { respExecuteResult } from "@/services/utils"
import { findUnitById, deleteUnit, updateUnit } from "@/services/unit"

const handler: NextApiHandler = async (req, res) => {
  const unitId = req.query.id as string
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  if (req.method === "GET") {
    try {
      const result = await findUnitById({
        id: unitId,
      })

      return respExecuteResult(res, result)
    } catch (error) {
      // TODO: Log error
      return res.status(500).end()
    }
  }

  if (req.method === "PUT") {
    try {
      const result = await updateUnit({
        id: unitId,
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
      const result = await deleteUnit({
        id: unitId,
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
