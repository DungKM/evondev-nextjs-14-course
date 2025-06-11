import React from 'react'
import LessonSaveUrl from '../LessonSaveUrl'
import { getCourseBySlug } from '@/lib/actions/course.actions';
import { findAllLessons } from '@/lib/actions/lesson.actions';
import PageNotPound from '@/app/not-found';
import LessonNavigation from '../LessonNavigation';
import Heading from '@/components/common/Heading';
import MuxPlayer from '@mux/mux-player-react';
import VideoPlayer from './VideoPlayer';

const page = async ({ params, searchParams }: { params: { course: string }; searchParams: { slug: string } }) => {
    const course = params.course;
    const slug = searchParams.slug;
    const findCourse = await getCourseBySlug({ slug: course });
    if (!findCourse) return null;
    const courseId = findCourse._id.toString();
    const lessonList = await findAllLessons({ course: courseId || "" });
    const lessonDetails = lessonList?.find((el) => el.slug === slug);
    if (!lessonDetails) return null;
    const currentLessonIndex = lessonList?.findIndex((lesson) => lesson.slug === slug) || 0;

    const nextLesson = lessonList?.[currentLessonIndex + 1];
    const prevLesson = lessonList?.[currentLessonIndex - 1];
    if (!findCourse || !lessonDetails) return <PageNotPound />
    const videoId = lessonDetails.video_url?.split("v=")[1];
    return (
        <div className='mb-5'>
            <LessonSaveUrl course={course} url={`/${course}/lesson?slug=${slug}`}></LessonSaveUrl>
            <VideoPlayer nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`} prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`} />
            <Heading className='mb-10'>{lessonDetails.title}</Heading>
            <div className='p-5 rounded-lg bgDarkMode border borderDarkMode entry-content'>
                <div dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}></div>
            </div>
        </div>
    )
}

export default page