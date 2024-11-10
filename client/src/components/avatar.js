'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLogout } from "@/redux/slices/userSlice"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export default function UserAvatar({disabled}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const {userDetails} = useSelector(state=>state.user)

  const handleLogout = ()=>{
    dispatch(setLogout())
    router.push('/')
  }
  if(disabled){
    return (
      <Avatar>
      <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${userDetails?.user?.avatar}`} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatar/${userDetails?.user?.avatar}`} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userDetails?.user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userDetails?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}