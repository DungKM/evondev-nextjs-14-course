"use server";

import User, { IUser } from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/components/types";

export default async function createUser(params: TCreateUserParams): Promise<TCreateUserParams | undefined> {
    try {
       connectToDatabase();
       const newUser = await User.create(params);
       return newUser;
    }
    catch (error) {
      console.log(error)
    }
}