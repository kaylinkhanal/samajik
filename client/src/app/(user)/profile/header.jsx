"use client";
import { useEffect } from "react";
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

export function Profileheader() {
  const {
    userDetails: {
      user: {
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
      },
    },
  } = useSelector((state) => state.user);
  //
  // const {
  //   userDetails: { user },
  // } = useSelector((state) => state.user);
  // console.log("user", user);
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${_id}`,
      );
      dispatch(setUserDetails(data));
    } catch (e) {
      console.log(e);
    }
  };
  const uploadAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload-avatar/${_id}`,
      { body: formData },
    );
    if (res.status == 200) {
      fetchUserDetails();
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="space-y-4">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600" />

      {/* Profile Info */}
      <div className="px-4">
        <div className="flex justify-between -mt-20">
          <UploadImages onChange={uploadAvatar} />

          <Button className="bg-orange-500 hover:bg-orange-600">
            Edit Profile
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-muted-foreground">@{email.split("@")[0]}</p>
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
            <button className="hover:underline">
              <span className="font-bold">2,456</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold">1,234</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
