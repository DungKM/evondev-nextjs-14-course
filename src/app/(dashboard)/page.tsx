import { CourseGrid } from "@/components/common"
import CourseItem from "@/components/course/CourseItem"
import Heading from "@/components/typography/Heading"
import { Button } from "@/components/ui/button"

const page = () => {
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