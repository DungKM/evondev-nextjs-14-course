'use client'
import React, { MouseEvent, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { commonClassNames } from '@/constants'
import { IconCancel, IconCheck, IconDelete, IconEdit } from '../icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createLecture, updateLecture } from '@/lib/actions/lecture.actions'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { TCourseUpdateParams, TUpdateCourseLecture } from '../types'
import { cn } from '@/lib/utils'
import { createLesson, updateLesson } from '@/lib/actions/lesson.actions'
import { ILesson } from '@/app/database/lesson.model'
import slugify from 'slugify'
import LessonItemUpdate from '../lesson/LessonItemUpdate'

const CourseUpdateContent = ({ course }: {
    course: TCourseUpdateParams
}) => {
    const [lectureEdit, setLectureEdit] = useState("")
    const [lessonEdit, setLessonEdit] = useState("")
    const [lectureIdEdit, setLectureIdEdit] = useState("")
    const [lessonIdEdit, setLessonIdEdit] = useState("")
    const lectures = course?.lectures || [];
    const handleAddNewLecture = async () => {
        try {
            const res = await createLecture({
                course: course._id,
                title: 'Chương 1',
                order: lectures.length + 1,
                path: `/manage/course/update-content?slug=${course.slug}`
            });
            if (res?.success) {
                toast.success('Thêm chương mới thành công');
            }
        } catch (error) {

        }
    }
    const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        console.log(lectureId);
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await updateLecture({
                        updateData: {
                            _destroy: true,
                            path: `/manage/course/update-content?slug=${course.slug}`
                        },
                        lectureId
                    });
                    if (res?.success) {
                        toast.success("Xóa chương thành công!");
                    }
                }
            });

        } catch (error) {

        }
    }
    const handleUpdateLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
        e.stopPropagation();
        console.log(lectureId);
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await updateLecture({
                        lectureId,
                        updateData: {
                            title: lectureEdit,
                            path: `/manage/course/update-content?slug=${course.slug}`
                        },
                    });
                    if (res?.success) {
                        toast.success("Cập nhật chương thành công!");
                        setLectureIdEdit("");
                        setLectureEdit("");
                    }
                }
            });

        } catch (error) {

        }
    }
    const handleAddNewLesson = async (lectureId: string, courseId: string) => {
        try {
            const res = await createLesson({
                path: `/manage/course/update-content?slug=${course.slug}`,
                lecture: lectureId,
                course: courseId,
                title: 'Tiêu đề bài học mới',
                slug: `tieu-de-bai-hoc-moi-${new Date().getTime().toString().slice(-3)}`,
            });
            if (res?.success) {
                toast.success('Thêm bài học mới thành công');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
        e.stopPropagation();
        console.log(lessonId);
        try {
            const res = await updateLesson({
                lessonId,
                path: `/manage/course/update-content?slug=${course.slug}`,
                updateData: {
                    title: lessonEdit,
                    slug: slugify(lessonEdit, {
                        lower: true,
                        locale: 'vi',
                        remove: /[*+~.()'"!:@]/g,
                    }),
                }
            });
            if (res?.success) {
                toast.success('Cập nhật bài học thành công');
                setLessonIdEdit("");
                setLessonEdit("");
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div>
                <div className='flex flex-col gap-5'>
                    {lectures.map((lecture: TUpdateCourseLecture) =>
                        <div key={lecture._id}>
                            <Accordion type="single" collapsible={!lectureIdEdit} className="w-full">
                                <AccordionItem value={lecture._id}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-3 justify-between w-full pr-5'>
                                            {lecture._id === lectureIdEdit ? (
                                                <>
                                                    <div className='w-full'>
                                                        <Input placeholder='Tên Chương' defaultValue={lecture.title} onChange={e => setLectureEdit(e.target.value)} />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className={cn(commonClassNames.action, "text-green-500")} onClick={e => handleUpdateLecture(e, lecture._id)} >
                                                            <IconCheck />
                                                        </span>
                                                        <span className={cn(commonClassNames.action, "text-red-500")} onClick={e => {
                                                            e.stopPropagation();
                                                            setLectureIdEdit("");
                                                        }}>
                                                            <IconCancel />
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>{lecture.title}</div>
                                                    <div className="flex gap-2">
                                                        <span className={cn(commonClassNames.action, "text-blue-500")} onClick={e => {
                                                            e.stopPropagation();
                                                            setLectureIdEdit(lecture._id);
                                                        }}>
                                                            <IconEdit />
                                                        </span>
                                                        <span className={cn(commonClassNames.action, "text-red-500")} onClick={e => handleDeleteLecture(e, lecture._id)}>
                                                            <IconDelete />
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                            }
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='border-none !bg-transparent'>
                                        <div className='flex flex-col gap-5'>
                                            {lecture.lessons.length > 0 && lecture.lessons.map((lesson: ILesson) =>
                                                <Accordion type="single" collapsible={!lessonIdEdit} key={lesson._id} className="w-full">
                                                    <AccordionItem value={lesson._id}>
                                                        <AccordionTrigger>
                                                            <div className='flex items-center gap-3 justify-between w-full pr-5'>
                                                                {lesson._id === lessonIdEdit ? (
                                                                    <>
                                                                        <div className='w-full'>
                                                                            <Input placeholder='Tên nài học' defaultValue={lesson.title} onChange={e => setLessonEdit(e.target.value)} />
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <span className={cn(commonClassNames.action, "text-green-500")}
                                                                                onClick={e => handleUpdateLesson(e, lesson._id)}
                                                                            >
                                                                                <IconCheck />
                                                                            </span>
                                                                            <span className={cn(commonClassNames.action, "text-red-500")} onClick={e => {
                                                                                e.stopPropagation();
                                                                                setLessonIdEdit("");
                                                                            }}>
                                                                                <IconCancel />
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div>{lesson.title}</div>
                                                                        <div className="flex gap-2">
                                                                            <span className={cn(commonClassNames.action, "text-blue-500")} onClick={e => {
                                                                                e.stopPropagation();
                                                                                setLessonIdEdit(lesson._id);
                                                                            }}>
                                                                                <IconEdit />
                                                                            </span>
                                                                            <span className={cn(commonClassNames.action, "text-red-500")}
                                                                            // onClick={e => handleDeleteLesson(e, lecture._id)}
                                                                            >
                                                                                <IconDelete />
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )
                                                                }
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                           <LessonItemUpdate lesson={lesson}>
                                                           </LessonItemUpdate>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Button onClick={() => handleAddNewLesson(lecture._id, course._id)} className='mt-5 ml-auto w-fit block'>
                                Thêm bài học mới
                            </Button>
                        </div>
                    )}
                </div>
                <Button onClick={handleAddNewLecture} className='mt-5'>
                    Thêm chương mới
                </Button>
            </div>
        </>
    )
}

export default CourseUpdateContent