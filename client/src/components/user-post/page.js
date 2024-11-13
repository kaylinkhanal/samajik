'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import dayjs from 'dayjs';
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const generateTimeDurationStr = (inputDate) => {
      const formattedTimeDate = dayjs().to(dayjs(inputDate));
    return formattedTimeDate
}

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
            <Card  className="m-2 p-2 bg-orange-200">
               <strong>{item?.user?.fullName}</strong> 

               <div  
               dangerouslySetInnerHTML={{
                        __html: item.content
                    }}>
                </div> 
                {generateTimeDurationStr(item.createdAt)}
                <p>
               <div className='flex flex-col p-2 '>
                <div className='bg-white p-2 rounded-xl'>
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                 <p> comment 1</p>  
                </div>
                Kaylin khanal

               <textarea placeholder='enter comments here..' />
                </div> 

                </p>
            </Card>
        )
    })}</div>
  )
}

export default UserPost