"use client";

import Link from "next/link";
import React from "react";

import img from "./home/wows ss.jpeg";
import { DataType, LessonType } from "./types";

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
const name = "Jerry";
export const Context = React.createContext({ lessons, name });

const data: DataType = { lessons, name };

export default function Home() {
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
