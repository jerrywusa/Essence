"use client";

import { Context } from "@/app/page";
import { FunctionComponent, Suspense, useContext } from "react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "../VideoPlayer";

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

  const videoStyle = {
    borderRadius: 10,
    width: 1350,
    height: 600,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "90vh",
        }}
      >
        <VideoPlayer link={lesson.videoLink} style={videoStyle} />

        <div style={{ display: "flex", marginTop: "20px" }}>
          <p
            style={{
              position: "relative",
              left: "50px",
              width: "1000px",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {lesson.title}
          </p>
          <Button
            variant="ghost"
            style={{
              position: "relative",
              left: "50px",
              color: "white",
              opacity: ".5",
              marginLeft: "180px",
            }}
          >
            Replay
          </Button>
          <Button
            variant="destructive"
            style={{
              position: "relative",
              color: "white",
              opacity: ".5",
              marginLeft: "70px",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default WatchVideo;
