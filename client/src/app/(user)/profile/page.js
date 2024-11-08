'use client'
import UploadImages from '@/components/ImageUploads/page';
import { ProfileSkeletonWithCover } from '@/components/profile-skeleton-with-cover';
import { setUserDetails } from '@/redux/slices/userSlice';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Profile=()=> {
    const {userDetails} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const uploadAvatar = async(e) => {
      const formData = new FormData()
      formData.append('avatar', e.target.files[0])
      const res = await fetch('http://localhost:8080/upload-avatar/'+userDetails?.user?._id, {method:'POST' ,body: formData})
      if(res.status == 200){
        fetchUserDetails()
      }
    }

    const fetchUserDetails = async()=>{
     const {data} = await axios.get('http://localhost:8080/users/'+userDetails?.user?._id )
     dispatch(setUserDetails(data))
     }
  
     useEffect(()=>{
        fetchUserDetails()
     },[])
    return (
      <div>
        <UploadImages onChange={uploadAvatar}/>

      Phone Number : {userDetails?.user?.phoneNumber}
       Gender: {userDetails?.user?.gender}
       Skills: {userDetails?.user?.skills}

      </div>
    )
  }

  export default Profile