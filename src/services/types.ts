export type ExecuteResult<T> = {
  success: boolean
  status: number
  data?: T
}
