import { useQuery } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"
import { useSession } from "./use-session"

type UseTopicUnitsOptions = {
  topicId: number
}

export const useTopicUnits = ({ topicId }: UseTopicUnitsOptions) => {
  const { status } = useSession()
  return useQuery(["topics", topicId, "units"], () => FETCHER.getTopicUnits({ topicId }), {
    enabled: status === "success",
  })
}
