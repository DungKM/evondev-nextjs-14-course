import { IconPlay, IconStudy, IconUsers } from '@/components/icons'
import React from 'react'
import ButtonEnroll from './ButtonEnroll'

const CourseWidget = ({data, findUser}: {data: any, findUser: any}) => {
  return (
    <>
       <div className='bgDarkMode border borderDarkMode rounded-lg p-5 mb-10'>
          <div className='flex items-center gap-2 mb-3'>
            <strong className='text-primary text-xl font-bold'>{data.price.toLocaleString('vi-VN')}</strong>
            <span className='text-slate-400 line-through text-xl'>{data.sale_price.toLocaleString('vi-VN')}</span>
            <span className='ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm'>{Math.floor((data.price / data.sale_price) * 100)}%</span>
          </div>
          <h3 className='font-bold mb-3 text-sm'>Khóa học gồm có:</h3>
          <div className='mb-5 flex flex-col gap-2 text-sm text-slate-500'>
            <div className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>30h học</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>Video full HD</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconUsers className='size-4' />
              <span>Có nhóm hỗ trợ</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconStudy className='size-4' />
              <span>Có nhóm hỗ trợ</span>
            </div>
          </div>
          <ButtonEnroll
            user={findUser}
            courseId={JSON.parse(JSON.stringify(data._id))}
            amount={data.price}
          ></ButtonEnroll>
        </div>
    </>
  )
}

export default CourseWidget