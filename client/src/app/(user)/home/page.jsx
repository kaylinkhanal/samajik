import PostEditor from '@/components/editor/page'
import UserPost from '@/components/user-post/page'
import React from 'react'

const Home = () => {
  return (
    <div>
      <PostEditor/>
      <UserPost/>
    </div>
  )
}

export default Home