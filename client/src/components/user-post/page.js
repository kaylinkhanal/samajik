'use client'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Card } from '../ui/card'
import dayjs from 'dayjs';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const generateTimeDurationStr = (inputDate) => {
      const formattedTimeDate = dayjs().to(dayjs(inputDate));
    return formattedTimeDate
}

const UserPost = (props) => {

    const router = useRouter()
    const {userDetails} = useSelector(state=>state.user)

const [postId, setPostId] = useState('')
const inputRef = useRef([])
const [postComments, setPostComments] = useState([])

   const   fetchComments = async () => {
    const {data} = await axios.get(`http://localhost:3000/posts/${postId}/comments`)
    setPostComments(data)
   }

   const handlePost =async(commentPostId, idx)=> {
    if(!inputRef.current[idx].value.trim()){
        alert("Cannot post empty content")
        return;
    }
    setPostId(commentPostId)

    const {data} = await axios.post(`http://localhost:3000/posts/${commentPostId}/comments`, {
        "content": inputRef.current[idx].value,
        "commented_by": userDetails?.user?._id
    })
    fetchComments()
    inputRef.current[idx].value=''
   }

    useEffect(()=>{
        if(postId) fetchComments()
    },[postId])

  if(props.postList.length== 0) return "..."
  return (
    <div>
        {props.postList.map((item,idx)=>{
        return (
            <Card  className="m-2 p-2 bg-white shadow-sm w-[60%]">
                <div className='flex'>
                <Avatar onClick={()=>router.push('/profile/'+item?.user?._id)}>
                                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${item?.user?.avatar}`} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                <span className='text-orange-400 m-4 font-mono font-semibold'>{item?.user?.fullName}</span> 

                </div>
          
                <div className='m-4 bg-gray-100 p-4'>

                <div  
                dangerouslySetInnerHTML={{
                        __html: item.content
                    }}>
                </div> 
                {generateTimeDurationStr(item.createdAt)}
                </div>
           
                <p>
                <span className="bg-white shadow-sm m-2 w-14" >Like</span>
                <span className="bg-white shadow-sm m-2 w-14" onClick={()=>setPostId(item._id)}>Comment</span>
                <span className="bg-white shadow-sm m-2 w-14" >Share</span>

               <div className='flex flex-col p-2 '>
              {postId && postId == item._id && (
                        <div className='bg-white p-2 rounded-xl'>
                             {postComments.length>0 ? (
                                <div>
                                    {postComments.map((item)=>{
                                        return (
                                            <div className='flex gap-2'>
                                                      <Avatar onClick={()=>router.push('/profile/'+item?.commented_by?._id)}>
                                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${item?.commented_by?.avatar}`} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                <span className='text-orange-800 font-semibold' onClick={()=>router.push('/profile/'+item?.commented_by?._id)}>{item?.commented_by?.fullName}</span>
                                                {item.content}
                                                <span className='text-gray-400 text-sm'>
                                                {generateTimeDurationStr(item.createdAt)}
                                                    </span> 
                                                    
                                                </div>
                                        )
                                    })}
                                </div>
                             ): "No Comments Yet"}
                        </div>
              )}
            
               <div className='flex gap-4'>
               <textarea className='w-[90%]' ref={(element)=> inputRef.current[idx]= element} 
                    onClick={()=> setPostId(item._id)}
                    placeholder='enter comments here..'  
               />
               <Button className="bg-orange-400" onClick={ ()=>handlePost(item._id, idx)}> 
                                    <Send/>
               </Button>

               </div>
              
                </div> 

                </p>
            </Card>
        )
    })}</div>
  )
}

export default UserPost