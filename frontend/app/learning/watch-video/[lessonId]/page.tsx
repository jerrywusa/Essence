import { FunctionComponent } from "react";

interface WatchVideoProps {
  params: {
    lessonId: string;
  };
}

const WatchVideo: FunctionComponent<WatchVideoProps> = ({ params }) => {
  // return <div style={{ color: "green" }}>My Post: {params.lessonId}</div>;
  return <div style={{ color: "red" }}>hello world</div>;
};

export default WatchVideo;
