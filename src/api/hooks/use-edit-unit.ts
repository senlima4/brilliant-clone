import { useMutation, useQueryClient } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useEditUnit = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(FETCHER.updateUnit, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["topics", data.topicId, "units"])
      await queryClient.invalidateQueries(["units", data.id])
    },
  })
  return mutation
}
