import CourseManage from "@/components/course/CourseManage"
import { ECourseStatus } from "@/components/types/enums";
import { getAllCourse } from "@/lib/actions/course.actions";

const page = async ({searchParams} : {
  searchParams: {
    page?: number;
    search?: string;
    status?: ECourseStatus;
  }
}) => {
  const courses = await getAllCourse({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status 
  });
  return (
    <div><CourseManage courses={courses ? JSON.parse(JSON.stringify(courses)) : []}></CourseManage></div>
  )
}

export default page