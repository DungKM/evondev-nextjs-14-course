'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import Heading from '@/components/common/Heading';
import { IconCancel, IconCheck, IconDelete, IconEdit, IconEye, IconLeftArrow, IconRightArrow, IconStudy } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { EOrderStatus } from '@/components/types/enums';
import { commonClassNames, orderStatus } from '@/constants';
import { StatusBadge } from '@/components/common';
import Swal from 'sweetalert2'
import useQueryString from '@/hooks/useQueryString';
import { debounce } from 'lodash';
interface IOrderManageProps {
    code: string;
    course: { title: string } | null;
    user: { name: string } | null;
    total: number;
    discount: number;
    amount: number;
    status: EOrderStatus
};
const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
    const handleCancelOrder = () => {
        Swal.fire({
            title: "Bạn có muốn hủy đơn hàng không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Thoát"
        }).then(async (result) => {
            if (result.isConfirmed) {

            }
        });
    };
    const {createQueryString, router, pathname} = useQueryString();
    const handleCompleteOrder = () => {};
     const handleSearchOrder = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            router.push(`${pathname}?${createQueryString('search', e.target.value)}`);
        }, 500);
        const handleSelectStatus = (status: EOrderStatus) => {
            router.push(`${pathname}?${createQueryString('status', status)}`);
        };
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
                        <Input placeholder='Tìm kiếm khóa học...' onChange={(e) => handleSearchOrder(e)} />
                    </div>
                    <Select onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {orderStatus.map((status) => (
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
                        <TableHead>Mã đơn hàng</TableHead>
                        <TableHead>Khóa học</TableHead>
                        <TableHead>Thành viên</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Mã giảm giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length > 0 && orders.map((order) => {
                        const orderStatusItem = orderStatus.find(item => item.value === order.status);
                        return (
                            <TableRow key={order.code}>
                                <TableCell className='font-medium'>{order.code}</TableCell>
                                <TableCell className='font-medium'>{order.course?.title}</TableCell>
                                <TableCell className='font-medium'>{order.user?.name}</TableCell>
                                <TableCell className='font-medium'><div className='flex flex-col gap-2'>
                                    <span>{order.amount.toLocaleString("us-US")}</span>
                                    <span>{order.discount > 0 && <span>{order.discount.toLocaleString("us-US")}</span>}</span>
                                    <strong className='text-orange-500'>{order.total.toLocaleString("us-US")}</strong>
                                </div></TableCell>
                                <TableCell className='font-medium'></TableCell>
                                <TableCell className='font-medium'>
                                    <StatusBadge item={orderStatusItem}></StatusBadge>
                                </TableCell>
                                <TableCell>
                                    <div className='flex gap-3'>

                                        <button type="button" className={commonClassNames.action} onClick={handleCompleteOrder}>
                                            <IconCheck />
                                        </button>

                                        <button type='button' className={commonClassNames.action} onClick={handleCancelOrder}>
                                            <IconCancel />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}

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