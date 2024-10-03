import UserAvatar from '@/components/avatar'

import SideBar from '@/components/sideBar'
import React from 'react'

const Home = () => {
  return (
    <div><SideBar/>
    <div className="absolute right-8 top-2 ">
    <UserAvatar  />

      
    </div>
    
    
    </div>
  )
}

export default Home