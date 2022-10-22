import * as React from "react"
import { CH } from "@code-hike/mdx/components"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { Heading, Button, Text, Divider, UnorderedList, OrderedList, ListItem } from "@chakra-ui/react"

import CondiBlock from "@/domain/unit-utils/condi/block"
import CondiTrigger from "@/domain/unit-utils/condi/trigger"

type UnitRendererProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const UnitRenderer: React.FC<UnitRendererProps> = ({ source }) => {
  return (
    <MDXRemote
      {...source}
      components={{
        CH,
        Button,
        CondiBlock,
        CondiTrigger,
        h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
        h2: (props) => <Heading as="h2" size="lg" fontWeight="bold" {...props} />,
        h3: (props) => <Heading as="h3" size="md" fontWeight="bold" {...props} />,
        h4: (props) => <Heading as="h4" size="sm" fontWeight="bold" {...props} />,
        h5: (props) => <Heading as="h5" size="sm" fontWeight="semibold" {...props} />,
        h6: (props) => <Heading as="h6" size="xs" fontWeight="semibold" {...props} />,
        ul: (props) => <UnorderedList {...props} />,
        ol: (props) => <OrderedList {...props} />,
        li: (props) => <ListItem {...props} />,
        p: (props) => <Text {...props} />,
        strong: ({ children }) => <Text fontWeight="bold">{children}</Text>,
        hr: (props) => <Divider {...props} />,
      }}
    />
  )
}

export default React.memo(UnitRenderer)
