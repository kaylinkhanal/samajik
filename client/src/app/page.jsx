'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Main = () => {
  const { userDetails: { isLoggedIn } } = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      loading skeleton
    </>
  );
}

export default Main;

