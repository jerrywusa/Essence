import { FunctionComponent } from "react";

interface VideoPlayerProps {
  link: string; // string MUST begin with http
  style: any;
  videoId: string;
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  link,
  style,
  videoId,
}) => {
  return (
    <div className="hover:cursor-pointer">
      <video controls preload="none" style={style} id={videoId}>
        <source src={link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
