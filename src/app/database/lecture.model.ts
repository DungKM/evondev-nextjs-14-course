import { Document, model, models, Schema } from "mongoose";

export interface ILecture extends Document {
    _id: string;
    title: string;
    course: Schema.Types.ObjectId;
    lessons: Schema.Types.ObjectId[];
    created_at: Date;
    order: number;
    _destroy: boolean;
}

const lectureSchema = new Schema<ILecture>({
    title: { type: String, required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    created_at: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
    _destroy: { type: Boolean, default: false }
});

const Lecture = models.Lecture || model<ILecture>("Lecture", lectureSchema);
export default Lecture;
