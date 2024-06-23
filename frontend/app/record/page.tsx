"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ClerkProvider, useUser } from '@clerk/nextjs';

const VideoRecorder = dynamic(() => import('../../components/VideoRecorder'), {
  ssr: false
});

const Page = () => {
  const { user, isSignedIn } = useUser(); // Using Clerk's useUser hook for client-side user data

  if (!isSignedIn) {
    return <p>Loading or not signed in...</p>;
  }

  return (
    <div>
      <h1>Video Recording Page</h1>
      <p>Welcome, {user?.firstName} and</p>
      <VideoRecorder />
    </div>
  );
};

export default Page;
