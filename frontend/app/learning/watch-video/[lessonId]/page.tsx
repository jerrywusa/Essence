"use client";

import { Context } from "@/app/page";
import { FunctionComponent, useContext } from "react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "../VideoPlayer";
import { useRouter } from "next/navigation";

interface WatchVideoProps {
  params: {
    lessonId: string;
  };
}

const WatchVideo: FunctionComponent<WatchVideoProps> = ({ params }) => {
  const { lessons } = useContext(Context);
  const router = useRouter();

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

  function replayVideo() {
    var video = document.getElementById(lesson!.videoId)!;
    video.currentTime = 0; // Rewind the video to the beginning
    video.play(); // Start playing the video
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "90vh",
        }}
      >
        <VideoPlayer
          link={lesson.videoLink}
          style={videoStyle}
          videoId={lesson.videoId}
        />

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
              marginLeft: "35px",
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
              opacity: ".7",
              marginLeft: "140px",
            }}
            onClick={() => replayVideo()}
          >
            Replay
          </Button>
          <Button
            variant="destructive"
            style={{
              position: "relative",
              color: "white",
              marginLeft: "70px",
            }}
            onClick={() =>
              router.push(`/learning/record-video/${lesson.lessonId}`)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default WatchVideo;
