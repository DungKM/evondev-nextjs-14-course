import Link from 'next/link'
import React from 'react'

const PageNotPound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold text-5xl'>404</h1>
      <h2>Page not found</h2>
      <Link href="/" className='text-black font-bold hover:text-primary flex items-center gap-2 mt-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Trang chủ</Link>
    </div>
  )
}

export default PageNotPound