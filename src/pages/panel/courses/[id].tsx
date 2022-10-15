import { Box, Heading, Spinner } from "theme-ui"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { unstable_getServerSession } from "next-auth/next"
import type { GetServerSidePropsContext } from "next"

import { useCourse } from "@/api/hooks"
import { checkCourseOwner } from "@/services/course"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

const CourseEditor = dynamic(() => import("@/domain/courses/editor"), { ssr: false })
const TopicCreator = dynamic(() => import("@/domain/topics/creator"), { ssr: false })
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
      <Box>
        <Box>
          <Heading>Edit Course</Heading>
          <CourseEditor defaultValues={data} />
        </Box>
        <Box>
          <Heading>Create Topic</Heading>
          <TopicCreator courseId={data.id} />
        </Box>
        <TopicList courseId={data.id} showUnits />
      </Box>
    )
  }

  return (
    <Box>
      <Heading>Course</Heading>
      <Box>{component}</Box>
    </Box>
  )
}

export default CoursePage
