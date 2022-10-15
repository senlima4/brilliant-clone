import { useMutation, useQueryClient } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useCreateTopic = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(FETCHER.createTopic, {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["courses", variables.courseId, "topics"])
    },
  })
  return mutation
}
