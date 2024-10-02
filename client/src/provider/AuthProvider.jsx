"use client"
import { setLogin } from "@/redux/slices/userSlice"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
// import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
// const authRoute = ["/login", "/register"]
const AuthProvider = ({ children }) => {
  // const { userDetails: { isLoggedIn } } = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const router = useRouter()
  // const pathname = usePathname()
  const validateUser = async () => {
    try {
      const { data } = await axios("http://localhost:8080/is-logged-in", { withCredentials: true })
      if (data.isLoggedIn) {
        dispatch(setLogin(data))
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }
  const {
    data,
    error,
    isLoading,
  } = useQuery({ queryKey: ["userDetails"], queryFn: () => validateUser() });
  if (data) {
    console.log("useQueryData: ", data)
  }
  if (isLoading) {
    return (
      <>loading..</>
    )
  } else if (error) {
    return (
      <>{error}</>
    )
  }
  return (
    <>{children}</>
  )

}

export default AuthProvider
