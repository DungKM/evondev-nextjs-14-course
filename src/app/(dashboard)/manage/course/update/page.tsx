import Course from '@/app/database/course.model'
import Heading from '@/components/common/Heading'
import CourseUpdate from '@/components/course/CourseUpdate'
import { getCourseBySlug } from '@/lib/actions/course.action'
import React from 'react'

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
    const findCourse = await getCourseBySlug({ slug: searchParams.slug });
    if (!findCourse) return null;
    return (
        <>
            <Heading className='mb-8'>cập nhật khóa học</Heading>
            <CourseUpdate />
        </>
    )
}

export default page