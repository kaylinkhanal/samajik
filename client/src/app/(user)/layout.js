import UserAvatar from '@/components/avatar'
import SideBar from '@/components/sideBar'
import { Avatar } from '@/components/ui/avatar'
import React from 'react'

const UserLayout = ({children}) => {
  return (
    <div> <div className="flex h-screen w-full bg-muted dark:bg-[#1e1e1e]">
        <SideBar/>
        <div className='absolute right-8 top-2'>
        <UserAvatar/>
        </div>
        <div className="flex-1 overflow-auto">
          <main className="p-6">
             {children}
         </main>
    </div>  
  </div>
  </div>
  )
}

export default UserLayout