import SideBar from '@/components/SideBar'
import React from 'react'

const UserLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-muted dark:bg-[#1e1e1e]">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default UserLayout
