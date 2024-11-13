'use client';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Camera, Phone, User, Briefcase } from 'lucide-react'
import { setUserDetails } from '@/redux/slices/userSlice'

const Profile = () => {
  const { userDetails } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const uploadAvatar = async (e) => {
    if (!e.target.files?.[0]) return
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    const res = await fetch(
      `http://localhost:8080/upload-avatar/${userDetails?.user?._id}`,
      { method: 'POST', body: formData }
    )
    if (res.status === 200) {
      fetchUserDetails()
    }
  }

  const { data, isLoading, refetch: fetchUserDetails } = useQuery(['userDetails', userDetails?.user?._id], async () => {
    const { data } = await axios.get(`http://localhost:8080/users/${userDetails?.user?._id}`)
    dispatch(setUserDetails(data))
    return data
  }, { enabled: !!userDetails?.user?._id })

  useEffect(() => {
    if (userDetails?.user?._id) {
      fetchUserDetails()
    }
  }, [userDetails?.user?._id])

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    (<Card className="max-w-2xl mx-auto">
      <CardHeader className="p-0">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative">
          <div className="absolute -bottom-16 left-4">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage
                src={userDetails?.user?.avatar || "/placeholder.svg?height=128&width=128"}
                alt="Profile picture" />
              <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
              <Camera className="w-4 h-4" />
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadAvatar} />
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-20">
        <h1 className="text-2xl font-bold mb-2">{userDetails?.user?.name || 'User Name'}</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{userDetails?.user?.phoneNumber || 'Phone number not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <span>{userDetails?.user?.gender || 'Gender not specified'}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userDetails?.user?.skills && userDetails.user.skills.length > 0 ? (
                userDetails.user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))
              ) : (
                <span className="text-muted-foreground">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>)
  );
}

const ProfileSkeleton = () => (
  <Card className="max-w-2xl mx-auto">
    <CardHeader className="p-0">
      <Skeleton className="h-48 w-full" />
    </CardHeader>
    <CardContent className="pt-20">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <div>
          <Skeleton className="h-6 w-24 mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default Profile