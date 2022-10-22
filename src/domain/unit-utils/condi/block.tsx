import * as React from "react"

import { useCondiContext } from "@/domain/unit-utils/condi/context"

type CondiBlockProps = {
  condiId: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

const CondiBlock: React.FC<CondiBlockProps> = ({ condiId, fallback = null, children }) => {
  const [show, setShow] = React.useState(false)
  const { store, initCondi } = useCondiContext()

  React.useEffect(() => {
    initCondi(condiId)
  }, [initCondi, condiId])

  React.useEffect(() => {
    if (store[condiId]) {
      setShow(true)
    }
  }, [store])

  let component = <>{fallback}</>

  if (show) {
    component = <>{children}</>
  }

  return component
}

export default React.memo(CondiBlock)
