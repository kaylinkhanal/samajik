'use client'
import PostEditor from '@/components/editor/page'
import UserPost from '@/components/user-post/page'
import axios from 'axios'
import React, { act, useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
const Home = () => {
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState([])
  const [currentPage ,setCurrentPage] = useState(1)
  const fetchPost =async ()=>{
      const { data } = await axios.get(`http://localhost:8080/posts?page=${currentPage}`)
      setPostList(data.posts)
      const pageCount = Math.ceil(data.totalCount/5)
      const pageArr = Array.from({length: pageCount}, ()=> 1 )
      setPage(pageArr)
    }

  useEffect(()=>{
      fetchPost()
  },[currentPage])

  const handlePageChange = (pageSelected, action)=>{
    if(action === 'previous' && pageSelected !== 1){
      setCurrentPage(currentPage-1)
    }else if(action === 'next' && pageSelected !== page.length ){
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div>
      <PostEditor  fetchPost={fetchPost} postList={postList}/>
      <UserPost  fetchPost={fetchPost} postList={postList}/>
        <Pagination>
        <PaginationContent>
          <PaginationItem onClick={()=>handlePageChange(currentPage, "previous")}>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {page.map((item,id)=>{
            return (
              <PaginationItem  onClick={()=>setCurrentPage(id+1)}>
              <PaginationLink className={currentPage == id+1 ? "bg-orange-400": null} href="#">{id+1}</PaginationLink>
            </PaginationItem>
            )
          })}
         
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem onClick={()=>handlePageChange(currentPage, "next")}>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default Home



