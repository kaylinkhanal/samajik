"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UploadImages(props) {

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group w-32 h-32 rounded-full overflow-hidden">
        <Avatar className="w-full h-full border-4 border-white">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${props.avatar}`}
            className="w-full h-full object-cover bg-slate-500"
          />
          <AvatarFallback>
            {props.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href="#"
            className="text-white hover:text-primary-foreground"
            prefetch={false}
          >
            <EyeIcon className="w-6 h-6" />
            <span className="sr-only">View Profile</span>
          </Link>
          <label
            htmlFor="profile-picture"
            className="text-white hover:text-primary-foreground cursor-pointer"
          >
            <UploadIcon className="w-6 h-6" />
            <span className="sr-only">Upload New Image</span>
            <input
              id="profile-picture"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={props.onChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
