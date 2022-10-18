import { useMutation, useQueryClient } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(FETCHER.createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"])
    },
  })
  return mutation
}
