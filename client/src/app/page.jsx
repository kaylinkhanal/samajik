'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './login/page';
import { useRouter } from 'next/navigation';

const Main = () => {
  const { userDetails: { isLoggedIn } } = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {!isLoggedIn && <LoginPage />}
    </>
  );
}

export default Main;
