import { FunctionComponent } from "react";

interface WatchVideoProps {
  params: {
    lessonId: string;
  };
}

const WatchVideo: FunctionComponent<WatchVideoProps> = ({ params }) => {
  return (
    <div style={{ color: "white" }}>My Post: {params.lessonId ?? "no id"}</div>
  );
};

export default WatchVideo;
