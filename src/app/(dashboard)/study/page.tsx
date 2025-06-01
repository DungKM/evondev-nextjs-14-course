import { CourseGrid } from '@/components/common';
import Heading from '@/components/common/Heading'
import CourseItem from '@/components/course/CourseItem';
import { getUserCourses } from '@/lib/actions/user.actions';
import React from 'react'
import StudyCourse from './StudyCourse';

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse courses={courses ? JSON.parse(JSON.stringify(courses)) : []}></StudyCourse>
    </>
  )
}

export default page