'use client'
import UserPost from "@/components/user-post/page";
import { Profileheader } from "./header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { userDetails  } = useSelector(state=>state.user)
  const [postList, setPostList] = useState([])
  const fetchPost =async ()=>{
      const { data } = await axios.get(`http://localhost:8080/posts/${userDetails?.user?._id}`)
      setPostList(data)
  }

  useEffect(()=>{
      fetchPost()
  },[])
  return (
    <div>
      <Profileheader />
      <UserPost fetchPost={fetchPost} postList={postList} />
    </div>
  );
};

export default Profile;
