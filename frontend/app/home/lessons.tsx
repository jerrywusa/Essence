"use client";

import { Context } from "@/app/page";
import { FunctionComponent, useContext } from "react";
import Lesson from "./lesson";

interface LessonsProps {}

const Lessons: FunctionComponent<LessonsProps> = () => {
  const { lessons } = useContext(Context);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: "25px",
        paddingLeft: "70px",
      }}
    >
      {lessons.map((lesson) => (
        <Lesson key={lesson.lessonId} lesson={lesson} />
      ))}
    </div>
  );
};

export default Lessons;
