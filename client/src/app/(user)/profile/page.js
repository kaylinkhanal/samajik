'use client'
import UploadImages from '@/components/ImageUploads/page';
import { ProfileSkeletonWithCover } from '@/components/profile-skeleton-with-cover';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Profile=()=> {
    // const { isPending, error, data } = useQuery({
    //   queryKey: ['repoData'],
    //   queryFn: () =>
    //   axios('http://localhost:8080/users')
    // })
  
    // if (isPending) return <ProfileSkeletonWithCover/>
  
    // if (error) return 'An error has occurred: ' + error.message
    const uploadAvatar = async(e) => {
      const formData = new FormData()
      formData.append('avatar', e.target.files[0])
     await fetch('http://localhost:8080/upload-avatar/66f8b52206525a65a785c575', {method:'POST' ,body: formData})
    }
  
    return (
      <div>
        <UploadImages onChange={uploadAvatar}/>
        
      </div>
    )
  }

  export default Profile