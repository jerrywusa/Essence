"use client";

import Link from "next/link";
import React from "react";
import { useUser, SignInButton } from "@clerk/nextjs"; // Import the necessary hooks from Clerk

import img from "./home/wows ss.jpeg";
import { DataType, LessonType } from "./types";
import { useRouter } from "next/navigation";


const lessons: Array<LessonType> = [
  {
    image: img,
    title: "title 1",
    speechType: "dialogue",
    lessonId: "id1",
    videoLink: "http://localhost:3000/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 2",
    speechType: "monologue",
    lessonId: "id2",
    videoLink: "http://localhost:3000/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 3",
    speechType: "monologue",
    lessonId: "id3",
    videoLink: "http://localhost:3000/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 4",
    speechType: "monologue",
    lessonId: "id4",
    videoLink: "http://localhost:3000/videos/ForestGump.mp4",
  },
  {
    image: img,
    title: "title 5",
    speechType: "dialogue",
    lessonId: "id5",
    videoLink: "http://localhost:3000/videos/ForestGump.mp4",
  },
];
export const Context = React.createContext({ lessons });

const data: DataType = { lessons };

export default function Home() {
  const { isSignedIn } = useUser(); // Get the user's authentication status
  const router = useRouter();
  if (isSignedIn) {
    router.push('/home');
    
  } else {
    // Render the landing page if the user is not signed in
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg mb-8">Please sign in to access your lessons and more.</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
        </SignInButton>
      </div>
    );
  }
  
  // Render the main content if the user is signed in
  return (
    <Context.Provider value={data}>
      
      <div>
        <Link href="/home">go to home page</Link>
      </div>
      <div>
        <Link href="/history">go to history page</Link>
      </div>
      <div>
        <Link href="/profile">go to profile page</Link>
      </div>
    </Context.Provider>
  );
}
