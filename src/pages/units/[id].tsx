import * as React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { Box, Heading, Text } from "@chakra-ui/react"
import { serialize } from "next-mdx-remote/serialize"
import { remarkCodeHike } from "@code-hike/mdx"
import theme from "shiki/themes/dracula.json"
import { unstable_getServerSession } from "next-auth/next"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

import prisma from "@/libs/prisma"
import { checkCourseOwner } from "@/services/course"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { CondiProvider } from "@/domain/unit-utils/condi/context"
import ReaderLayout from "@/domain/reader/layout"
import { UNIT_CONTENT_SX } from "@/domain/reader/styles"

const UnitRenderer = dynamic(() => import("@/domain/units/renderer"), { ssr: false })

type PageProps = {
  title: string
  description: string
  createdAt: string
  updatedAt: string
  source: any
}

const TEST_MDX = `
Do you want to open the hidden block?

<CondiTrigger condiId="test" />

<CondiBlock condiId="test">
  It could be question form, toggler, etc. But now I tired to implement it.
</CondiBlock>
`

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const unitId = context.query.id as string

  if (unitId === "demo") {
    const source = await serialize(TEST_MDX, {
      mdxOptions: {
        remarkPlugins: [remarkCodeHike],
        rehypePlugins: [],
      },
      scope: {},
    })

    return {
      props: {
        title: "Demo Article",
        description: "Demo article for test",
        createdAt: format(Date.now(), "yyyy-MM-dd"),
        updatedAt: format(Date.now(), "yyyy-MM-dd"),
        source,
      },
    }
  }

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
  })
  if (!unit) {
    return {
      notFound: true,
    }
  }

  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (unit.status === "DRAFT") {
    const topicInfo = await prisma.topic.findUnique({
      where: { id: unit.topicId },
      select: { course: true },
    })

    const isOwner = checkCourseOwner({
      courseId: topicInfo.course.id,
      userId: session.user.id,
    })
    if (!isOwner) {
      return {
        notFound: true,
      }
    }
  }

  const mdxSource = await serialize(unit.structure, {
    mdxOptions: {
      remarkPlugins: [[remarkCodeHike, { autoImport: false, theme }]],
      useDynamicImport: true,
    },
  })

  return {
    props: {
      title: unit.title,
      description: unit.description,
      createdAt: unit.createdAt.toISOString(),
      updatedAt: unit.updatedAt.toISOString(),
      source: mdxSource,
    },
  }
}

const UnitPage = ({
  title,
  description,
  source,
  createdAt,
  updatedAt,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <ReaderLayout>
        <CondiProvider>
          <Box sx={UNIT_CONTENT_SX}>
            <Heading>{title}</Heading>
            {description && <Text>{description}</Text>}
            <Box my={2}>
              <Text fontSize="sm">Created At: {format(new Date(createdAt), "yyyy-MM-dd")}</Text>
              <Text fontSize="sm">Updated At: {format(new Date(updatedAt), "yyyy-MM-dd")}</Text>
            </Box>
            <UnitRenderer source={source} />
          </Box>
        </CondiProvider>
      </ReaderLayout>
    </>
  )
}

export default UnitPage
