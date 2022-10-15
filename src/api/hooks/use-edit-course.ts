import { useMutation, useQueryClient } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

export const useEditCourse = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(FETCHER.updateCourse, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["courses", data.id])
    },
  })
  return mutation
}
