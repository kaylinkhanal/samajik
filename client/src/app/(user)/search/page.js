'use client'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar } from '@radix-ui/react-avatar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [searchResult, setSearchResult] = useState([])
  const searchInput=async (inputVal) =>{
   const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?startsWith=${inputVal}`)
   setSearchResult(data)
  }
  return (
    <div>
      <Input  onChange={(e)=> searchInput(e.target.value)} placeholder="Search People"/>

      
    <div className=' p-6 flex flex-col gap-3'>
      {searchResult?.length>0 ? searchResult.map((item)=>{
        return (
          <Card onClick={()=>router.push('/profile/'+ item._id)}>
            <CardHeader >
              <div className='flex'>
              <Avatar className='w-8'>
                  <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${item?.avatar}`} alt="@shadcn" />
                  <AvatarFallback>{item.fullName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                  <span>{item.fullName}</span>   
              </div>
                
              </CardHeader>
          </Card>
        )
      }) : "Please Search!!"}
    

    </div>
 
    </div>
  )
}

export default Search