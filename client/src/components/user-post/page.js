'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'

const UserPost = () => {
    const [postList, setPostList] = useState([])
    const fetchPost =async ()=>{
        const { data } = await axios.get(`http://localhost:8080/posts`)
        setPostList(data)
    }

    useEffect(()=>{
        fetchPost()
    },[])

  if(postList.length== 0) return "..."
  return (
    <div>{postList.map((item)=>{
        return (
            <Card  className="m-2 p-2">
               <div  
               dangerouslySetInnerHTML={{
                        __html: item.content
                    }}>
                </div> 
                {item.createdAt}

            </Card>
        )
    })}</div>
  )
}

export default UserPost