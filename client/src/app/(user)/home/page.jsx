'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const { user, isLoggedIn } = useSelector(state => state.user)
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn, router])
  if (!isLoggedIn) {
    return null
  } else {
    return <section>{JSON.stringify({ user, isLoggedIn })}</section>
  }
}
export default Home
