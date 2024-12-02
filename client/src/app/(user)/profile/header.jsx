"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Briefcase,
  Heart,
  Cake,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import UploadImages from "@/components/ImageUploads/page";
import { setUserDetails } from "@/redux/slices/userSlice";
import axios from "axios";
import { formatDateToMonthYear } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function Profileheader(props) {
  const params = useParams()
  console.log(params)
  const [fetchedUserDetails, setFetchedUserDetails] = useState(null);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([])
  const [showFollowers, setShowFollowers] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/users/${props.id}`);
      setFetchedUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  useEffect(()=>{
    getUserDetails()
  },[])

  //
  // const {
  //   userDetails: { user },
  // } = useSelector((state) => state.user);
  // console.log("user", user);
  const { toast } = useToast()

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);

  const uploadAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-avatar/${fetchedUserDetails?._id}`,
        { body: formData }
      );
      if (res.status === 200) {
        getUserDetails();
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

 

  const handleFollow = async  ()=>{
   const {data} =await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/follow/${userDetails?.user?._id}/${props.id}`)
  if(data.msg) toast({
    title: data.msg
  })
  }





  const getFollowerList = async  ()=>{
    const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/followers/${params.id}`)
   if(data) setFollowersList(data.followers)
   }



  if(!fetchedUserDetails?._id) return "loading..."
  const {
    _id,
    fullName,
    avatar,
    email,
    bio,
    location,
    website,
    createdAt,
    address,
    jobTitle,
    relationshipStatus,
    skills,
    birthday,

  } = fetchedUserDetails;

  return (
    <div className="space-y-4">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600" />

      {/* Profile Info */}
      <div className="px-4">
        <div className="flex justify-between -mt-20">
          <UploadImages
            onChange={uploadAvatar}
            avatar={fetchedUserDetails?.avatar}
            fullName={fetchedUserDetails?.fullName}
          />

          <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                {/* Blank content for Edit Profile popup */}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-muted-foreground">@{email?.split("@")[0]}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-muted-foreground">
            {address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{`${address.city}, ${address.state}, ${address.country}`}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a href={website} className="text-orange-500 hover:underline">
                  {website}
                </a>
              </div>
            )}
            {createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDateToMonthYear(createdAt)}</span>
              </div>
            )}
            {jobTitle && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{jobTitle}</span>
              </div>
            )}
            {relationshipStatus && (
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{relationshipStatus}</span>
              </div>
            )}
            {birthday && (
              <div className="flex items-center gap-1">
                <Cake className="h-4 w-4" />
                <span>Born {formatDateToMonthYear(birthday)}</span>
              </div>
            )}
          </div>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={() => handleFollow()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Follow
            </Button>
            <Dialog open={showFollowing} onOpenChange={setShowFollowing}>
              <DialogTrigger asChild>
                <button className="hover:underline">
                  <span className="font-bold">{fetchedUserDetails.followingCount}</span>{" "}
                  <span className="text-muted-foreground">Following</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Following</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
              <DialogTrigger asChild>
                <button onClick={getFollowerList} className="hover:underline">
                  <span className="font-bold">{fetchedUserDetails.followersCount}</span>{" "}
                  <span className="text-muted-foreground">Followers</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Followers</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                 { followersList.map((item)=>{
                    return (
                      <div className='flex'>
                      <Avatar className='w-8'>
                          <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${item?.avatar}`} alt="@shadcn" />
                          <AvatarFallback>{item.fullName[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                          <span>{item.fullName}</span>   
                      </div>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

