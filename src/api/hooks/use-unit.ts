import { useQuery } from "@tanstack/react-query"

import { FETCHER } from "@/api/fetcher"

type UseUnitOptions = {
  unitId: string
}

export const useUnit = ({ unitId }: UseUnitOptions) => {
  return useQuery(["units", unitId], () => FETCHER.getUnit(unitId))
}
