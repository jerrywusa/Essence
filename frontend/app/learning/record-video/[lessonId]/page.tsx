"use client";
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const VideoRecorder = dynamic(() => import('../../../../components/VideoRecorder'), {
  ssr: false
});

const Page = () => {
  const { user, isSignedIn } = useUser(); // Using Clerk's useUser hook for client-side user data
  const [lastVideoId, setLastVideoId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId;
  
  const handleVideoUpload = (videoId: string) => {
    setLastVideoId(videoId);
    console.log('Last video ID:', videoId);
    router.push(`/learning/review-video/${lessonId}?videoId=${videoId}`);
  };

  if (!isSignedIn) {
    return <p>Loading or not signed in...</p>;
  }

  return (
    <div style={{ backgroundColor: '#101010' }} className="min-h-screen text-white p-16">
      
      <div className="flex space-x-8">
        <div className="w-1/2">
          <VideoRecorder onVideoUpload={handleVideoUpload}/>
        </div>
        <div style={{ backgroundColor: '#1B1B1B', height: '658px', overflowY: 'auto' }} className="w-1/2 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">The Script</h2>
          <p className="mb-4 text-lg font-light text-gray-400">INT. JORDAN BELFORT'S OFFICE - DAY</p>
          <p className="mb-4">Jordan Belfort, charismatic and driven, stands before his team of brokers, all eager and energized.</p>
          <p className="mb-4 font-bold">JORDAN BELFORT:</p>
          <p className="mb-4">Alright, listen up, you bunch of wild stallions! Today, we're going to show the world who we are! We're not just brokers, we're wolves! And these stocks out there, they're our prey. We hunt them down, we grab them by the neck, and we don't let go until we've made our kill! Are you with me?!</p>
          <p className="mb-4">The brokers cheer and clap, energized by Jordan's fiery speech.</p>
          <p className="mb-4 font-bold">JORDAN BELFORT:</p>
          <p className="mb-4">Good! Because today, we're going to make history. We're going to pick up the phone, make those calls, and close those deals like our lives depend on it! Because guess what? They do! Now get out there and sell, sell, sell!</p>
          <p>The brokers rush out of the office, pumped up and ready to conquer Wall Street.</p>
          <p className="mb-4 text-lg font-light text-gray-400">INT. JORDAN BELFORT'S OFFICE - DAY</p>
          <p className="mb-4">Jordan Belfort, charismatic and driven, stands before his team of brokers, all eager and energized.</p>
          <p className="mb-4 font-bold">JORDAN BELFORT:</p>
          <p className="mb-4">Alright, listen up, you bunch of wild stallions! Today, we're going to show the world who we are! We're not just brokers, we're wolves! And these stocks out there, they're our prey. We hunt them down, we grab them by the neck, and we don't let go until we've made our kill! Are you with me?!</p>
          <p className="mb-4">The brokers cheer and clap, energized by Jordan's fiery speech.</p>
          <p className="mb-4 font-bold">JORDAN BELFORT:</p>
          <p className="mb-4">Good! Because today, we're going to make history. We're going to pick up the phone, make those calls, and close those deals like our lives depend on it! Because guess what? They do! Now get out there and sell, sell, sell!</p>
          <p>The brokers rush out of the office, pumped up and ready to conquer Wall Street.</p>
          <p className="mt-8 italic">end of script</p>
        </div>
        
      </div>
      <div className="flex justify-end mt-8 space-x-4">
        <button className="bg-gray-700 text-white py-2 px-4 rounded">Redo</button>
        <button className="bg-red-600 text-white py-2 px-4 rounded">Done</button>
      </div>
    </div>
  );
};

export default Page;
