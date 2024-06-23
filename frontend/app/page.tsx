"use client";

import Link from "next/link";
import React from "react";
import { useUser, SignInButton } from "@clerk/nextjs"; // Import the necessary hooks from Clerk

import img from "./home/wows ss.jpeg";
import { DataType, LessonType } from "./types";
import { useRouter } from "next/navigation";
import Image from "next/image";



const lessons: Array<LessonType> = [
  {
    image: img,
    title: "title 1",
    speechType: "dialogue",
    lessonId: "id1",
  },
  {
    image: img,
    title: "title 2",
    speechType: "monologue",
    lessonId: "id2",
  },
  {
    image: img,
    title: "title 3",
    speechType: "monologue",
    lessonId: "id3",
  },
  {
    image: img,
    title: "title 4",
    speechType: "monologue",
    lessonId: "id4",
  },
  {
    image: img,
    title: "title 5",
    speechType: "dialogue",
    lessonId: "id5",
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
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <Image
          src={img}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="absolute top-0 left-0 p-6">
          <div className="flex items-center">
            <div className="bg-red-500 h-12 w-12"></div> {/* Placeholder for your logo */}
            <p className="text-red-500 text-2xl font-bold ml-2">ssence</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-6">
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-red-500 text-white rounded">Get Started</button>
          </SignInButton>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-red-500 text-6xl font-bold mb-4">ssence</h1>
          <p className="text-white text-2xl mb-8">From practice to <span className="font-bold">performance</span></p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-red-500 text-white rounded text-lg">Let's begin!</button>
          </SignInButton>
        </div>
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
