import { FunctionComponent } from "react";

interface VideoPlayerProps {
  link: string; // string MUST begin with http
  style: any;
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ link, style }) => {
  return (
    <video controls preload="none" style={style}>
      <source src={link} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
