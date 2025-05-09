import { ELessonType } from "@/components/types/enums";
import { model, models, Schema } from "mongoose";

export interface ILesson {
    _id: string;
    title: string;
    slug: string;
    lecture: Schema.Types.ObjectId;
    course: Schema.Types.ObjectId;
    type: ELessonType;
    order: number;
    duration: number;
    video_url: string;
    content: string;
    created_at: Date;
    _destroy: boolean;
}

const lessonSchema = new Schema<ILesson>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    lecture: { type: Schema.Types.ObjectId, ref: "Lecture" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    order: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    video_url: { type: String },
    content: { type: String },
    type: { type: String, enum: Object.values(ELessonType), default: ELessonType.VIDEO },
    created_at: { type: Date, default: Date.now },
    _destroy: { type: Boolean, default: false }
});
const Lesson = models.Lesson || model<ILesson>("Lesson", lessonSchema);
export default Lesson;