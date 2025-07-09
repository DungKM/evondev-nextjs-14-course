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
import { debounce, update } from 'lodash';
import { updateOrder } from '@/lib/actions/order.actions';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
interface IOrderManageProps {
    _id: string;
    code: string;
    course: { title: string } | null;
    user: { name: string } | null;
    total: number;
    discount: number;
    amount: number;
    status: EOrderStatus
};
const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
    const handleUpdateOrder = async ({ orderId, status }: { orderId: string, status: EOrderStatus }) => {
        if (status === EOrderStatus.CANCELED) {
            Swal.fire({
                title: "Bạn có muốn hủy đơn hàng không?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Thoát"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateOrder({ orderId, status }); // Replace with actual order ID
                }
            });
        }
        if (status === EOrderStatus.COMPLETED) {
            const res = await updateOrder({ orderId, status }); // Replace with actual order ID
            if (res?.success) {
                toast.success("Cập nhật đơn hàng thành công");
            }
        }
    };
    const { createQueryString, router, pathname } = useQueryString();
    const handleSearchOrder = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        router.push(`${pathname}?${createQueryString('search', e.target.value)}`);
    }, 500);
    const handleSelectStatus = (status: EOrderStatus) => {
        router.push(`${pathname}?${createQueryString('status', status)}`);
    };
    return (
        <>
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
                                    <strong className={cn(order.status === EOrderStatus.COMPLETED ? 'text-green-500' : 'text-orange-500')}>{order.total.toLocaleString("us-US")}</strong>
                                </div></TableCell>
                                <TableCell className='font-medium'></TableCell>
                                <TableCell className='font-medium'>
                                    <StatusBadge item={orderStatusItem}></StatusBadge>
                                </TableCell>
                                <TableCell>
                                    {order.status !== EOrderStatus.CANCELED && (
                                        <div className='flex gap-3'>
                                            {order.status === EOrderStatus.PENDING && (
                                                <button type="button" className={commonClassNames.action} onClick={() => handleUpdateOrder({ orderId: order._id, status: EOrderStatus.COMPLETED })}>
                                                    <IconCheck />
                                                </button>
                                            )}
                                            <button type='button' className={commonClassNames.action} onClick={() => handleUpdateOrder({ orderId: order._id, status: EOrderStatus.CANCELED })}>
                                                <IconCancel />
                                            </button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </>
    )
}

export default OrderManage