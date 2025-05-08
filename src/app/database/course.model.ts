import { ECourseLevel, ECouseStatus } from "@/components/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ICourse extends Document {
     _id: string;
     title: string;
     image: string;
     intro_url: string;
     desc: string;
     price: number;
     sale_price: number;
     slug: string;
     status: ECouseStatus;
     created_at: Date;
     author: Schema.Types.ObjectId;
     level: ECourseLevel;
     views: number;
     rating: number[];
     info: {
        requirements: string[];
        benefits: string[];
        qa: {
            question: string;
            answer: string;
        }
    }[];
    letures: Schema.Types.ObjectId[];
    _destroy: boolean
}
const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String },
    intro_url: { type: String },
    desc: { type: String },
    price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    status: { type: String, enum: Object.values(ECouseStatus), default: ECouseStatus.PENDING },
    created_at: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    level: { type: String, enum: Object.values(ECourseLevel), default: ECourseLevel.BEGINNER },
    views: { type: Number, default: 0 },
    rating: { type: [Number], default: [] },
    letures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    info: {
        requirements: { type: [String], default: [] },
        benefits: { type: [String], default: [] },
        qa: {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    },
    _destroy: { type: Boolean, default: false }
});
const Course = models.User || model<ICourse>("User", courseSchema);
export default Course;