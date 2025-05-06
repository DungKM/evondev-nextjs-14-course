import { CourseGrid } from "@/components/common"
import CourseItem from "@/components/course/CourseItem"
import Heading from "@/components/typography/Heading"
import createUser from "@/lib/actions/user.actions"

const page = async () => {
  const user = await createUser({
    clerkId: "1234567890",
    name: "Nguyễn Văn A",
    username: "nguyenvana",
    email_address: "hoanganhdung13122000@gmail.com",
    avatar: "https://example.com/avatar.jpg",
  })
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </>
  )
}

export default page