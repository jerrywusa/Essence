"use client";

import { Context } from "@/app/page";
import { FunctionComponent, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface WatchVideoProps {
  params: {
    lessonId: string;
  };
}

const WatchVideo: FunctionComponent<WatchVideoProps> = ({ params }) => {
  const { lessons } = useContext(Context);

  const lesson = lessons.find((lesson) => lesson.lessonId === params.lessonId);

  if (!lesson) {
    return <div>undefined</div>;
  }

  const imageStyle = {
    borderRadius: 10,
    width: 444,
    height: 340.36,
    objectFit: "cover",
    border: "1px solid green",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "90vh",
        border: "1px solid orange",
      }}
    >
      <Image src={lesson.image} alt="image description" style={imageStyle} />
      <p
        style={{
          position: "relative",
          top: "275px",
          left: "50px",
          width: "1000px",
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          border: "1px solid green",
        }}
      >
        {lesson.title}
      </p>
      <Button
        variant="ghost"
        style={{
          position: "relative",
          top: "275px",
          left: "50px",
          color: "white",
          opacity: ".5",
          border: "1px solid green",
        }}
      >
        Replay
      </Button>
    </div>
  );
};

export default WatchVideo;
