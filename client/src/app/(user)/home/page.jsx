'use client'
import PostEditor from '@/components/editor/page'
import UserPost from '@/components/user-post/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [postList, setPostList] = useState([])
  const fetchPost =async ()=>{
      const { data } = await axios.get(`http://localhost:8080/posts`)
      setPostList(data)
  }

  useEffect(()=>{
      fetchPost()
  },[])
  return (
    <div>
      <PostEditor  fetchPost={fetchPost} postList={postList}/>
      <UserPost  fetchPost={fetchPost} postList={postList}/>
    </div>
  )
}

export default Home