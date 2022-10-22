import * as React from "react"
import { Button } from "@chakra-ui/react"

import { useCondiContext } from "./context"

type TriggerProps = {
  condiId: string
}

const Trigger: React.FC<TriggerProps> = ({ condiId }) => {
  const { editCondi } = useCondiContext()

  const handleTrigger = React.useCallback(() => {
    editCondi(condiId, true)
  }, [condiId])

  return <Button onClick={handleTrigger}>Trigger</Button>
}

export default React.memo(Trigger)
