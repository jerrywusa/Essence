import { FunctionComponent, useId } from "react";
import Lesson from "./lesson";
import { LessonType } from "../types";
import { uid } from "uid";

interface LessonsProps {
  lessons: Array<LessonType>;
}

const Lessons: FunctionComponent<LessonsProps> = ({ lessons }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: "25px",
        paddingLeft: "25px",
      }}
    >
      {lessons.map((lesson) => (
        <Lesson key={lesson.lessonId} lesson={lesson} />
      ))}
    </div>
  );
};

export default Lessons;
