import PageNotPound from '@/app/not-found';
import { getOrderDetails } from '@/lib/actions/order.actions';
import React from 'react'

const OrderDetail = async ({params}: {params: {
  code: string
}}) => {
const orderDetails = await getOrderDetails({ code: params.code });
if(!orderDetails)  return <PageNotPound />
  return (
    <div>
      <p>Cảm ơn bạn đã mua khóa học
        <strong className='text-primary'> {orderDetails?.course?.title}</strong>
        với số tiền là
        <strong className='text-primary'> {orderDetails?.amount.toLocaleString('vi-VN')}</strong>
      </p>
      <p>Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung :  <strong className='text-primary'>{orderDetails.code}</strong></p>
     
       
      
    </div>
  )
}

export default OrderDetail