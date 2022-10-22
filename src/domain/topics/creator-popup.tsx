import * as React from "react"
import dynamic from "next/dynamic"
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react"

import type { TopicCreatorProps } from "./creator"

const TopicCreator = dynamic(() => import("./creator"), { ssr: false })

type TopicCreatorPopupProps = {
  children: React.ReactNode
} & TopicCreatorProps

const TopicCreatorPopup: React.FC<TopicCreatorPopupProps> = ({ children, courseId }) => {
  return (
    <Popover isLazy placement="bottom-start">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <TopicCreator courseId={courseId} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default React.memo(TopicCreatorPopup)
