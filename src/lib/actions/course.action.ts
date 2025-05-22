"use server";
import { TCourseUpdateParams, TCreateCourseParams, TUpdateCourseParams } from "@/components/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/app/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/app/database/lecture.model";
// import "@/app/database/lecture.model";
export async function getAllCourse(): Promise<ICourse[] | undefined> {
    try {
        connectToDatabase();
        const courses = await Course.find();
        return courses;
    } catch (error) {
        
    }
}
export async function createCourse(params: TCreateCourseParams) {
    try {
        connectToDatabase();
        const existCourse = await Course.findOne({ slug: params.slug });
        if (existCourse) {
            return {
                succcess: false,
                message: "Đường dẫn đã tồn tại!",
            }
        }
        const course = await Course.create(params);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(course)),
        };
    } catch (error) {
        console.log(error);
    }
}
export async function getCourseBySlug({ slug }: { slug: string }): Promise<TCourseUpdateParams | null | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug }).populate({
            path: "lectures",
            model: Lecture,
            select: "_id title",
            match: {
                _destroy: false,
            }
        });
        
        return findCourse;
    } catch (error) {
        console.log(error);
    }
}
export async function updateCourse(params: TUpdateCourseParams) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug: params.slug });
        if(!findCourse) return;
        await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
            new: true,
        });
        revalidatePath(params.path || "/");
        return {
            success: true,
            message: "Cập nhật thành công!",
        };
    } catch (error) {
        console.log(error)
    }
}