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

const CourseManage = () => {
    return (
        <div>
            <Heading className='mb-8'>Quản lý khóa học</Heading>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thông tin</TableHead>
                        <TableHead>Giá khóa học</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className='flex items-center gap-3'>
                                <Image alt='' className='flex-shrink-0 size-20 rounded-lg object-cover' src="https://images.unsplash.com/photo-1747633126452-dee49902fc6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={80} height={80} />
                                <div className='flex flex-col gap-1'>
                                    <h3 className='font-bold text-base'>Khóa học React JS</h3>
                                    <h4 className='text-sm text-slate-500'>21/06/2025</h4>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className='text-primary font-bold'>499.000</span>
                        </TableCell>
                        <TableCell>
                            <span className={cn(commonClassNames.status, courseStatus[0].className)}>{courseStatus[0].title}</span>
                        </TableCell>
                        <TableCell>
                            <div className='flex gap-3'>
                                <Link href="/course/hoa-hoc-react-js-16" className={commonClassNames.action}>
                                    <IconStudy />
                                </Link>
                                <Link href="/manage/course/update/?slug=hoa-hoc-react-js-16" className={commonClassNames.action}>
                                    <IconEdit />
                                </Link>
                                <Link href="/course/hoa-hoc-react-js-16" target='_blank' className={commonClassNames.action}>
                                    <IconEye />
                                </Link>
                                <button className={commonClassNames.action}>
                                    <IconDelete />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseManage