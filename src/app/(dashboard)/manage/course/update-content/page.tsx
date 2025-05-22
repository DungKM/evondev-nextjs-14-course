import Heading from '@/components/common/Heading';
import CourseUpdateContent from '@/components/course/CourseUpdateContent';
import { getCourseBySlug } from '@/lib/actions/course.action'
import React from 'react'

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>Course not found</h1>
      </div>
    )
  }
  return (
    <>
      <Heading className='mb-10'>Nội dung: <strong className='text-primary'>{findCourse.title}</strong></Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))}></CourseUpdateContent>
    </>
  )
}

export default page