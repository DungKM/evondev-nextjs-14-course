'use client';

import React, { useEffect, useState } from 'react';
import { ICourse } from '@/app/database/course.model'
import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import { courseStatus, lastLessonKey } from '@/constants'

const StudyCourse = ({ courses }: {
    courses: ICourse[] | undefined | null
}) => {
    const [lastLesson, setLastLesson] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = JSON.parse(localStorage.getItem(lastLessonKey) || '[]');
            setLastLesson(data);
        }
    }, []);

    if (!courses || courseStatus.length === 0) return null;
    return (
        <CourseGrid>
            {courses.map((course) => {
                const url = lastLesson.find((item: any) => item.course === course.slug)?.lesson || '';
                return (
                    <CourseItem
                        key={course.slug}
                        data={course}
                        cta="Tiếp tục học"
                        url={url}
                    />
                )
            })}
        </CourseGrid>
    )
}

export default StudyCourse;
