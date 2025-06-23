import { CourseGrid } from "@/components/common"
import Heading from "@/components/common/Heading";
import CourseItem from "@/components/course/CourseItem"
import { getAllCoursePublic } from "@/lib/actions/course.actions"

const page = async () => {
  const courses = await getAllCoursePublic({}) || [];
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.map((course) => (
          <CourseItem
            key={course._id}
            data={course}
          />
        ))}
      </CourseGrid>
    </>
  )
}

export default page