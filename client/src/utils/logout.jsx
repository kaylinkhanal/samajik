'use client'
import { setLogout } from "@/redux/slices/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const useLogout = async () => {
  const dispatch = useDispatch()
  const router = useRouter()
  await axios("http://localhost:8080/logout", { withCredentials: true })
  dispatch(setLogout())
  router.push("/")
}
export default useLogout
