import LessonContent from '@/components/lesson/LessonContent'
import { getCourseBySlug } from '@/lib/actions/course.actions';
import { getHistory } from '@/lib/actions/history.action';
import { countLessonsByCourseId } from '@/lib/actions/lesson.actions';
import React from 'react'

const page = async ({ params, searchParams }: { params: { course: string }; searchParams: { slug: string } }) => {
    const course = params.course;
    const slug = searchParams.slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse) return null;
    const lectures = findCourse.lectures || [];
    const courseId = findCourse._id.toString();
    const histories = await getHistory({ course: courseId || "" });
    const lessonCount = await countLessonsByCourseId({courseId});
    const completePercentage = ((histories?.length || 0) / (lessonCount || 1)) * 100;
    return (
        <div className='sticky top-5 right-0 h-[calc(100svh-100px)] overflow-y-auto'>
            <div className='h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2'>
                <div className='h-full rounded-full gradient-process w-0 transition-all duration-300' style={{ width: `${completePercentage}%` }}></div>
            </div>
            <LessonContent lectures={lectures} course={course} slug={slug} histories={histories ? JSON.parse(JSON.stringify(histories)) : []}></LessonContent>
        </div>)
}

export default page