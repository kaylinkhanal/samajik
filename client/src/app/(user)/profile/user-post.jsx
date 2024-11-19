import axios from 'axios'
import React from 'react'

const UserPost = async() => {
   const {data} = await axios.get('http://localhost:8080/posts/6736a19271b0aa9e8848c752') 
 
  return (
    <div>
      {data.map((item)=>{
        return (
            <div>
                {item.content}
            </div>
        )
      })}
    </div>
  )
}

export default UserPost