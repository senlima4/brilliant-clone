import { useMutation, useQueryClient } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useCreateUnit = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(FETCHER.createTopicUnit, {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["topics", variables.topicId, "units"])
    },
  })
  return mutation
}
