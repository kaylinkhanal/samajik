"use client"
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { userDetails } = useSelector(state => state.user)
  return (
    <div>{JSON.stringify(userDetails)}</div>
  )
}

export default Home
