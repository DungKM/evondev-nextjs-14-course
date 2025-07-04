import Sidebar, { MenuItem } from '@/components/layout/Sidebar'
import { menuItems } from '@/constants'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar />
      <ul className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 right-0 gap-5 z-10 bg-white dark:bg-gray-900 justify-center h-16">
        {menuItems.map((item, index) => (
          <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} onlyIcon></MenuItem>
        ))}
      </ul>
      <div className='hidden lg:block'></div>
      <main className='p-5'>{children}</main>
    </div>
  )
}

export default layout