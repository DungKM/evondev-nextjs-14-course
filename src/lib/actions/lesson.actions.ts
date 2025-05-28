'use server';

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { TCreateLessonParams, TUpdateLessonParams } from "@/components/types";
import Course from "@/app/database/course.model";
import Lecture from "@/app/database/lecture.model";
import Lesson, { ILesson } from "@/app/database/lesson.model";

export async function createLesson(params: TCreateLessonParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findById(params.course);
        if (!findCourse) return;
        const findLecture = await Lecture.findById(params.lecture);
        if (!findLecture) return;
        const newLesson = await Lesson.create(params);
        findLecture.lessons.push(newLesson._id);
        await findLecture.save();
        revalidatePath(params.path || "/");
        if (!newLesson) return;
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
    }
}
export async function updateLesson(params: TUpdateLessonParams) {
    try {
        connectToDatabase();
        const res = await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, { new: true });
        if (!res) return;
        revalidatePath(params.path || "/");
        return {
            success: true,
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getLessonBySlug({slug, course}: { slug: string, course: string }): Promise<ILesson | undefined> {
    try {
        connectToDatabase();
        const findLesson = await Lesson.findOne({ slug, course });
        if (!findLesson) return;
        revalidatePath(slug || "/");
        return findLesson;
    } catch (error) {
        console.log(error);
    }
}
export async function findAllLessons ({ course }: { course: string }): Promise<ILesson[] | undefined> {
    try {
        connectToDatabase();
        const findLessons = await Lesson.find({ course });
        if (!findLessons) return;
        revalidatePath(course || "/");
        return findLessons;
    } catch (error) {
        console.log(error);
    }
}
