"use server";

import Course from "@/app/database/course.model";
import { connectToDatabase } from "../mongoose";
import { TCreateLectureParams, TUpdateLectureParams } from "@/components/types";
import Lecture from "@/app/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findById(params.course);
        if(!findCourse) return;
        const newLecture = await Lecture.create(params);
        findCourse.lectures.push(newLecture._id);
        findCourse.save();
        revalidatePath(params.path || '/');
        return {
            success: true,
        }
    } catch (error) {
        console.log(error);
    }
}
export async function updateLecture(params: TUpdateLectureParams) {
    try {
        connectToDatabase();
        const res = await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
            new: true,
        });
        console.log(res);
        revalidatePath(params.updateData.path || '/');
        if (!res) return;
        return {
            success: true,
        }
    } catch (error) {
        console.log(error);
    }
}