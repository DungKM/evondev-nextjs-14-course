'use client'
import React, { MouseEvent } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { commonClassNames } from '@/constants'
import { IconDelete, IconEdit } from '../icons'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createLecture, updateLecture } from '@/lib/actions/lecture.action'
import { toast } from 'react-toastify'
import path from 'path'

const CourseUpdateContent = ({ course }: {
    course: any
}) => {
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
        try {
                await updateLecture({
                lectureId,
                updateData: {
                    _destroy: true,
                    path: `/manage/course/update-content?slug=${course.slug}`
                },
            });
        } catch (error) {
            
        }
    }
    return (
        <>
        <div>
            {lectures.map((lectures: any) =>
                <Accordion type="single" collapsible className="w-full" key={lectures._id}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className='flex items-center gap-3 justify-between w-full pr-5'>
                                <div>{lectures.title}</div>
                                {/* <div className='w-full'>
                                <Input placeholder='Tên Chương' />
                            </div> */}
                                <div className="flex gap-2">
                                    <span className={commonClassNames.action}>
                                        <IconEdit />
                                    </span>
                                    <span className={commonClassNames.action} onClick={e => handleDeleteLecture(e, lectures._id)}>
                                        <IconDelete />
                                    </span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        {/* <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent> */}
                    </AccordionItem>
                </Accordion>
            )}
                <Button onClick={handleAddNewLecture} className='mt-5'>
                    Thêm chương mới
                </Button>
        </div>
        </>
    )
}

export default CourseUpdateContent