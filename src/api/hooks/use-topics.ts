import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"
import { useSession } from "./use-session"

type UseTopicsOptions = {
  courseId: string
}

export const useTopics = ({ courseId }: UseTopicsOptions) => {
  const { status } = useSession()
  return useQuery(["courses", courseId, "topics"], () => FETCHER.getCourseTopics(courseId), {
    enabled: status === "success",
  })
}
