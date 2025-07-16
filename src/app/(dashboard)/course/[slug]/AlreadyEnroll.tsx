import Link from 'next/link'
import React from 'react'

const AlreadyEnroll = () => {
    return (
        <div className='bgDarkMode border borderDarkMode rounded-lg p-5 mb-10'>
            Bạn đã đăng ký khóa học này. Vui lòng nhấn vào <Link href="/study" className='text-primary font-bold'>Khu vực học tập</Link>
        </div>
    )
}

export default AlreadyEnroll