import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"
import { useSession } from "./use-session"

export const useCourses = () => {
  const { status } = useSession()
  return useQuery(["courses"], FETCHER.getCourses, { enabled: status === "success" })
}
