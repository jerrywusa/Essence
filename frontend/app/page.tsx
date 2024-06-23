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
