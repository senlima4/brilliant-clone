import type { NextApiResponse } from "next"
import type { ExecuteResult } from "./types"

export const respExecuteResult = <T extends ExecuteResult<any>>(res: NextApiResponse, result: T) => {
  return result.success ? res.status(result.status).json(result.data) : res.status(result.status).end()
}
