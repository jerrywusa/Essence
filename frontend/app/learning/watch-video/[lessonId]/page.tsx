"use client";

import { Context } from "@/app/page";
import { FunctionComponent, useContext } from "react";

interface WatchVideoProps {
  params: {
    lessonId: string;
  };
}

const WatchVideo: FunctionComponent<WatchVideoProps> = ({ params }) => {
  const { lessons } = useContext(Context);

  const lesson = lessons.find((lesson) => lesson.lessonId === params.lessonId);

  return (
    <div style={{ color: "white" }}>My Post: {lesson?.title ?? "no title"}</div>
  );
};

export default WatchVideo;
