import { ICourse } from "@/app/database/course.model";
import { ILecture } from "@/app/database/lecture.model";
import { ILesson } from "@/app/database/lesson.model";

type TActiveLinkProps = {
    url: string;
    children?: React.ReactNode;
}
type TMenuItem = {
    url: string;
    title: string;
    icon: React.ReactNode;
    onlyIcon?: boolean;
}
type TCreateUserParams = {
    clerkId: string;
    username: string;
    email: string;
    name?: string;
    avatar?: string;
}
// Course
type TCreateCourseParams = {
    title: string;
    slug: string;
    author: string;
}
type TUpdateCourseParams = {
    slug: string;
    updateData: Partial<ICourse>;
    path?: string
}
export {
    TActiveLinkProps,
    TMenuItem,
    TCreateUserParams,
    TCreateCourseParams,
    TUpdateCourseParams
}

export type TCreateLectureParams = {
    course: string;
    title?: string;
    order?: number;
    path?: string;
}
export type TUpdateLectureParams = {
    lectureId: string;
    updateData: {
        title?: string;
        order?: number;
        _destroy?: boolean;
        path?: string;
    }
}
export type TUpdateCourseLecture = {
    _id: string;
    title: string;
    lessons: ILesson[];
}
interface ICourseUpdateLecture extends ILecture {
    lessons: ILesson[]
}
export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
    lectures: TUpdateCourseLecture[];
}
export type TGetAllCourseParams = {
    page?: number,
    limit?: number,
    search?: string,
    status?: string
}
// Lesson
export type TCreateLessonParams = {
    lecture: string;
    course: string;
    title?: string;
    order?: number;
    path?: string;
    slug?: string;
}

export type TUpdateLessonParams = {
    lessonId: string;
    updateData: {
        title?: string;
        slug?: string;
        duration?: number;
        video_url?: string;
        content?: string;
    };
    path?: string;
}

// History
export type TCreateHistoryParams = {
    course: string;
    lesson: string;
    checked?: boolean | string;
    path: string
}