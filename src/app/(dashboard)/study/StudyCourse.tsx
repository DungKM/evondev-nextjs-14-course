'use client';

import React, { useEffect, useState } from 'react';
import { ICourse } from '@/app/database/course.model'
import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import { courseStatus, lastLessonKey } from '@/constants'
type LastLessonItem = {
  course: string;
  lesson: string;
};
const StudyCourse = ({ courses }: {
    courses: ICourse[] | undefined | null
}) => {
    const [lastLesson, setLastLesson] = useState<LastLessonItem[]>([]);
    useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
      : [];
    setLastLesson(lesson);
  }, []);

    if (!courses || courseStatus.length === 0) return null;
    console.log(courses)
    return (
        <CourseGrid>
            {courses.map((item) => {
        const firstLessonUrl = item.lectures[0].lessons[0].slug;
        console.log(firstLessonUrl)
        const lastURL =
          lastLesson.find((element) => element.course === item.slug)?.lesson ||
          `/${item.slug}/lesson?slug=${firstLessonUrl}`;

        return (
          <CourseItem
            key={item.slug}
            cta="Tiếp tục học"
            data={item}
            url={lastURL}
          />
        );
      })}
        </CourseGrid>
    )
}

export default StudyCourse;
