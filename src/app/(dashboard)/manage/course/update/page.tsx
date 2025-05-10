import Course from '@/app/database/course.model'
import Heading from '@/components/common/Heading'
import CourseUpdate from '@/components/course/CourseUpdate'
import React from 'react'

const page = ({ searchParams }: { searchParams: { slug: string } }) => {
    return (
        <>
            <Heading className='mb-8'>cập nhật khóa học</Heading>
            <CourseUpdate />
        </>
    )
}

export default page