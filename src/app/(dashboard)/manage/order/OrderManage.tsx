
import React from 'react'
import { cn } from '@/lib/utils'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import Heading from '@/components/common/Heading';
import { IconLeftArrow, IconRightArrow } from '@/components/icons';
import { Input } from '@/components/ui/input';
const OrderManage = () => {
  return (
     <>
            <Link href="/manage/course/new" className='size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Link>
            <div className='flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10'>
                <Heading>Quản lý đơn hàng</Heading>
                <div className='flex gap-3'>
                    <div className='w-full lg:w-[300px]'>
                        <Input placeholder='Tìm kiếm khóa học...'  />
                    </div>
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
                  
                </TableBody>
            </Table>
            <div className='flex justify-end gap-3 mt-5'>
                <button>
                    <IconLeftArrow />
                </button>
                <button>
                    <IconRightArrow />
                </button>
            </div>
        </>
  )
}

export default OrderManage