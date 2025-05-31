"use server";

import User from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose";
import { auth } from "@clerk/nextjs/server";
import History, { IHistory } from "@/app/database/history.model";
import { TCreateHistoryParams } from "@/components/types";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistoryParams) {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId });
        if (!findUser) return;
        if (params.checked) {
            await History.create({
                user: findUser._id,
                course: params.course,
                lesson: params.lesson,
            });
        } else {
            await History.findOneAndDelete({
                user: findUser._id,
                course: params.course,
                lesson: params.lesson,
            });
        }
        revalidatePath(params.path);
    } catch (error) {
        console.log(error);
    }
}
export async function getHistory(params: { course: string }): Promise<IHistory[] | undefined> {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId });
        if (!findUser) return;
        const histoiries = await History.find({
            course: params.course,
            user: findUser._id,
        });
        return histoiries;
    } catch (error) {

    }
}