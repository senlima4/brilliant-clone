import { useRouter } from "next/router"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useSession = ({
  required = false,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig = {} as UseQueryOptions,
} = {}) => {
  const router = useRouter()
  const query = useQuery(["session"], FETCHER.getSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error)
      if (data || !required) return
      router.push(redirectTo)
    },
  })
  const user = query.data
  const status = query.status
  return { user, status }
}
