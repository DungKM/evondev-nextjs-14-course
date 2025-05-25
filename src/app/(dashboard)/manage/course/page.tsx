import CourseManage from "@/components/course/CourseManage"
import { getAllCourse } from "@/lib/actions/course.actions";

const page = async () => {
  const courses = await getAllCourse() || [];
  return (
    <div><CourseManage courses={courses ? JSON.parse(JSON.stringify(courses)) : []}></CourseManage></div>
  )
}

export default page