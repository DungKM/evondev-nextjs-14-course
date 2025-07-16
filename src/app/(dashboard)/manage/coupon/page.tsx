import Heading from '@/components/common/Heading';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IconDelete, IconEdit, IconEye, IconLeftArrow, IconRightArrow, IconStudy } from '@/components/icons';
import { StatusBadge } from '@/components/common';
import Image from 'next/image';
import { commonClassNames, courseStatus } from '@/constants';
const page = () => {
  return (
    <div>
        <Link href="/manage/course/new" className='size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                    <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
                        <Heading>Quản lý khóa học</Heading>
                        <div className='flex gap-3'>
                            <div className='w-full lg:w-[300px]'>
                                <Input placeholder='Tìm kiếm khóa học...'  />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {courseStatus.map((status) => (
                                            <SelectItem value={status.value} key={status.value}>{status.title}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Table className='table-responsive'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã</TableHead>
                                <TableHead>Tiêu đề</TableHead>
                                <TableHead>Giảm giá</TableHead>
                                <TableHead>Sử dụng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {courseLevel.length > 0 && courses.map((course) => {
        
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
                                            <StatusBadge item={courseStatusItems} onClick={() => handleChangesStatus(course.slug, course.status)}></StatusBadge>
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
                            })} */}
                        </TableBody>
                    </Table>
                    <div className='flex justify-end gap-3 mt-5'>
                        <button className={commonClassNames.pagination}>
                            <IconLeftArrow />
                        </button>
                        <button className={commonClassNames.pagination}>
                            <IconRightArrow />
                        </button>
                    </div>
    </div>
  )
}

export default page