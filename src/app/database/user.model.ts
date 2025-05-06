import { EUserRole, EUserStatus } from "@/components/types/enums";
import { Document, model, models, Schema } from "mongoose"
import { use } from "react";

export interface IUser extends Document {
    clerkId: string;
    name: string;
    username: string;
    email_address: string;
    avatar: string;
    status: EUserStatus;
    courses: Schema.Types.ObjectId[];
    role: EUserRole;
    createdAt: Date;
}
const userSchema = new Schema<IUser>({
    clerkId: { type: String },
    name: { type: String },
    username: { type: String, unique: true, required: true },
    email_address: { type: String, unique: true, required: true },
    avatar: { type: String },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: Object.values(EUserRole), default: EUserRole.USER },
    status: { type: String, enum: Object.values(EUserStatus), default: EUserStatus.ACTIVE },
}, { timestamps: true });
const User = models.User || model<IUser>("User", userSchema);
export default User;