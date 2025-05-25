'use client';
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Heading from '../common/Heading'
import Image from 'next/image'
import { commonClassNames, courseLevel, courseStatus } from '@/constants'
import { cn } from '@/lib/utils'
import { IconDelete, IconEdit, IconEye, IconStudy } from '../icons'
import Link from 'next/link'
import { ICourse } from '@/app/database/course.model';
import Swal from 'sweetalert2'
import { updateCourse } from '@/lib/actions/course.actions';
import { ECourseStatus } from '../types/enums';
import { toast } from 'react-toastify';
import { Input } from '../ui/input';

const IconArrowLeft = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>;
const IconArrowRight = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>;
const CourseManage = ({ courses }: { courses: ICourse[] }) => {
    const handleDeleteCourse = (slug: string) => {
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
                await updateCourse({
                    slug,
                    updateData: {
                        status: ECourseStatus.PENDING,
                        _destroy: true
                    },
                    path: "/manage/course"
                })
                toast.success("Xóa khóa học thành công!");
            }
        });
    };
    const handleChangesStatus = async (slug: string, status: ECourseStatus) => {
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
                    await updateCourse({
                        slug,
                        updateData: {
                            status: ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING,
                            _destroy: false
                        },
                        path: "/manage/course"
                    })
                    toast.success("Cập nhật trạng thái thành công!");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Link href="/manage/course/new" className='size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Link>
            <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
                <Heading>Quản lý khóa học</Heading>
                <div className='w-full lg:w-[300px]'>
                    <Input placeholder='Tìm kiếm khóa học...' />
                </div>
            </div>
            <Table className='table-responsive'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thông tin</TableHead>
                        <TableHead>Giá khóa học</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courseLevel.length > 0 && courses.map((course) => {

                        const courseStatusItems = courseStatus.find((item) => item.value === course.status);
                        return (
                            <TableRow key={course.slug}>
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Image alt='' className='flex-shrink-0 size-20 rounded-lg object-cover' src={course.image} width={80} height={80} />
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='font-bold tex-sm lg:text-base whitespace-nowrap'>{course.title}</h3>
                                            <h4 className='text-xs lg:text-sm text-slate-500'>{new Date(course.created_at).toLocaleDateString("vi-VI")}</h4>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className='text-sm font-bold lg:text-base'> {course.price.toLocaleString('vi-VN')} đ</span>
                                </TableCell>
                                <TableCell>
                                    <button className={cn(commonClassNames.status, courseStatusItems?.className)} onClick={() => handleChangesStatus(course.slug, course.status)}>{courseStatusItems?.title}</button>
                                </TableCell>
                                <TableCell>
                                    <div className='flex gap-3'>
                                        <Link href={`/manage/course/update-content?slug=${course.slug}`} className={commonClassNames.action}>
                                            <IconStudy />
                                        </Link>
                                        <Link href={`/manage/course/update/?slug=${course.slug}`} className={commonClassNames.action}>
                                            <IconEdit />
                                        </Link>
                                        <Link href={`/course/${course.slug}`} target='_blank' className={commonClassNames.action}>
                                            <IconEye />
                                        </Link>
                                        <button onClick={() => handleDeleteCourse(course.slug)} className={commonClassNames.action}>
                                            <IconDelete />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className='flex justify-end gap-3 mt-5'>
                <button className={commonClassNames.pagination}>
                    {IconArrowLeft}
                </button>
                <button className={commonClassNames.pagination}>
                    {IconArrowRight}
                </button>
            </div>
        </>
    )
}

export default CourseManage