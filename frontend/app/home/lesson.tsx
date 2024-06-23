"use client";

import { FunctionComponent } from "react";
import vectorSvg from "./Vector.svg";
import Image from "next/image";
import { LessonType } from "../types";
import { useRouter } from "next/navigation";

interface LessonProps {
  lesson: LessonType;
}

const imageStyle = {
  borderRadius: 10,
  width: 444,
  height: 340.36,
  objectFit: "cover",
};

const Lesson: FunctionComponent<LessonProps> = ({ lesson }) => {
  const router = useRouter();

  return (
    <div className="hover:cursor-pointer">
      <div
        style={{
          position: "relative",
          width: "415px",
          height: "340px",
        }}
        onClick={() => router.push(`/learning/watch-video/${lesson.lessonId}`)}
      >
        <Image src={lesson.image} alt="image description" style={imageStyle} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)", // Adjust gradient colors and direction as needed
            borderRadius: 10,
          }}
        />
        <p
          style={{
            position: "absolute",
            top: "250.91px",
            left: "21.82px",
            color: "white",
            fontSize: "26.18px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {lesson.title}
        </p>
        <p
          style={{
            position: "absolute",
            top: "290px",
            left: "40px",
            color: "white",
            fontSize: "17.45px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            opacity: ".75",
          }}
        >
          {lesson.speechType}
        </p>
        <Image
          src={vectorSvg}
          alt="vector svg icon"
          style={{
            position: "absolute",
            top: "293px",
            left: "21.82px",
            width: "13.96px",
            height: "17.45px",
          }}
        />
      </div>
    </div>
  );
};

export default Lesson;
