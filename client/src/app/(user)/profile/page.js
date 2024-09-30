'use client'
import { ProfileSkeletonWithCover } from '@/components/profile-skeleton-with-cover';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Profile=()=> {
    const { isPending, error, data } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
      axios('http://localhost:8080/users')
    })
  
    if (isPending) return <ProfileSkeletonWithCover/>
  
    if (error) return 'An error has occurred: ' + error.message
  
    return (
      <div>
        
      </div>
    )
  }

  export default Profile