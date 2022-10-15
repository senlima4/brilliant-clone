import { useQuery } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

type UseCourseOptions = {
  courseId: string
}

export const useCourse = ({ courseId }: UseCourseOptions) => {
  return useQuery(["courses", courseId], () => FETCHER.getCourse(courseId))
}
