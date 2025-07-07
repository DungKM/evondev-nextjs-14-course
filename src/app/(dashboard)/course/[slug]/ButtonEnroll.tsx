'use client'
import { IUser } from '@/app/database/user.model'
import { Button } from '@/components/ui/button'
import { createOrder } from '@/lib/actions/order.actions'
import { createOrderCode } from '@/utils'
import { create } from 'lodash'
import React from 'react'
import { toast } from 'react-toastify'

const ButtonEnroll = ({ user, courseId, amount }: {
    user: IUser | null | undefined,
    courseId: string,
    amount: number
}) => {
    const handleEnrollCourse = async () => {
        if (!user?.name) {
            toast.error('Bạn cần đăng nhập để mua khóa học này')
            return;
        }
        // const orderCode = createOrderCode();
        const newOrder = await createOrder({
            code: createOrderCode(),
            user: user._id,
            course: courseId,
            total: amount,
            amount: amount,
        });
        console.log(newOrder);
    }
    return (
        <Button variant='primary' className='w-full' onClick={handleEnrollCourse} >Mua khóa học</Button>
    )
}

export default ButtonEnroll