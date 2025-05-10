"use server";

import User, { IUser } from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/components/types";

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