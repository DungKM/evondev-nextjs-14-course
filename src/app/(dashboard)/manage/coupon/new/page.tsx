import React from 'react'
import NewCouponForm from './NewCouponForm'
import Heading from '@/components/common/Heading'

const page = () => {
    return (
        <div>
            <Heading>Tạo khóa học mới</Heading>
            <NewCouponForm></NewCouponForm>
        </div>
    )
}

export default page