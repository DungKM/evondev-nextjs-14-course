import { CourseGrid } from "@/components/common"
import CourseItem from "@/components/course/CourseItem"
import Heading from "@/components/typography/Heading"
import { getAllCourse } from "@/lib/actions/course.action"

const page = async () => {
  const courses = await getAllCourse() || [];
  console.log(courses);
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