'use client'
import UserPost from "@/components/user-post/page";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Profileheader } from "../header";
import { useParams } from "next/navigation";

const Profile = () => {
    const params = useParams()
  const [postList, setPostList] = useState([])
  const fetchPost =async ()=>{
      const { data } = await axios.get(`http://localhost:8080/posts/${params.id}`)
      setPostList(data)
  }

  useEffect(()=>{
      fetchPost()
  },[])
  return (
    <div>
      <Profileheader id={params.id}/>
      <UserPost fetchPost={fetchPost} postList={postList} />
    </div>
  );
};

export default Profile;
