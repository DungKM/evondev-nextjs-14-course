"use server";

import User, { IUser } from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/components/types";
import { auth } from "@clerk/nextjs/server";
import Course, { ICourse } from "@/app/database/course.model";
import { ECourseStatus } from "@/components/types/enums";
import path from "path";
import Lesson from "@/app/database/lesson.model";
import Lecture from "@/app/database/lecture.model";

export async function createUser(params: TCreateUserParams): Promise<TCreateUserParams | undefined> {
    try {
       connectToDatabase();
       const newUser = await User.create(params);
       return newUser;
    }
    catch (error) {
      console.log(error)
    }
}
export async function getUserInfo({userId} : { userId: string }): Promise<IUser | null | undefined> {
    try {
        connectToDatabase();
        const findUser = await User.findOne({ clerkId: userId });
        if (!findUser) return null;
        return findUser;
    } catch (error) {
        console.log(error);
    }

}
export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId }).populate(
            {
                path: "courses",
                model: Course,
                match:{
                    status: ECourseStatus.APPROVED
                },
                populate: {
                    path  : "lectures",
                    model : Lecture,
                     select: 'lessons',
                        populate: {
                        path: 'lessons',
                        model: Lesson,
                        select: 'slug',
                        },
                    }
            }
        );
        if (!findUser) return null;
        return findUser.courses || [];
    } catch (error) {
        console.log(error)
    }
}