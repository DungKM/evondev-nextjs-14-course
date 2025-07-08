'use client'
import { lastLessonKey } from "@/constants";
import { useEffect } from "react";
type LastLessonItem = {
    course: string;
    lesson: string;
};
const LessonSaveUrl = ({ url, course }: { url: string, course: string }) => {
    useEffect(() => {
        let results: LastLessonItem[] = JSON.parse(
            localStorage.getItem(lastLessonKey) || '[]'
        );

        const item: LastLessonItem = {
            course,
            lesson: url,
        };
        results = results.filter((item) => item.course !== course); // Remove existing entry for the same course
        results.push(item);
        localStorage.setItem(lastLessonKey, JSON.stringify(results));
    }, [course, url]);
    return null;
}

export default LessonSaveUrl