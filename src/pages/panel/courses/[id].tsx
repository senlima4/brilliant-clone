import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { unstable_getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next"

import { useCourse } from "@/api/hooks"
import { checkCourseOwner } from "@/services/course"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { SINGLETON_FUNCTION_SX } from "@/domain/panel/styles"

const PanelLayout = dynamic(() => import("@/domain/panel/layout"), { ssr: false })
const CourseEditor = dynamic(() => import("@/domain/courses/editor"), { ssr: false })
const TopicCreatorPopup = dynamic(() => import("@/domain/topics/creator-popup"), { ssr: false })
const TopicList = dynamic(() => import("@/domain/topics/admin-list"), { ssr: false })

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const courseId = context.query.id as string
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  const isOwner = await checkCourseOwner({
    userId: session?.user?.id,
    courseId,
  })

  if (!isOwner) {
    return {
      redirect: {
        destination: "/panel",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

const CoursePage = () => {
  const router = useRouter()
  const { status, data } = useCourse({ courseId: router.query.id as string })

  let component = (
    <Box>
      <Spinner />
    </Box>
  )

  if (status === "success") {
    component = (
      <Flex>
        <Box mr={12} flex="none" w="250px">
          <CourseEditor defaultValues={data} />
        </Box>
        <Box flex="auto" w="100%">
          <Flex mb={4} align="center" justifyContent="space-between">
            <Heading size="md">Topics</Heading>

            <TopicCreatorPopup courseId={data.id}>
              <Button size="sm">Create Topic</Button>
            </TopicCreatorPopup>
          </Flex>

          <TopicList courseId={data.id} showUnits />
        </Box>
      </Flex>
    )
  }

  return (
    <PanelLayout>
      <Box sx={SINGLETON_FUNCTION_SX}>
        <Heading mb={2} size="lg" textAlign="left">
          Course
        </Heading>
        {component}
      </Box>
    </PanelLayout>
  )
}

export default CoursePage
