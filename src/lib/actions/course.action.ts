"use server";
import { TCreateCourseParams, TUpdateCourseParams } from "@/components/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/app/database/course.model";
import { revalidatePath } from "next/cache";

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
export async function getCourseBySlug({ slug }: { slug: string }) {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({ slug });
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
        revalidatePath("/");
        return {
            success: true,
            message: "Cập nhật thành công!",
        };
    } catch (error) {
        console.log(error)
    }
}