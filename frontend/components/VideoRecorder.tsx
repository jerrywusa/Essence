import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../lib/firebase/firebaseConfig.d'; // Adjust path as necessary
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/nextjs';

interface VideoRecorderProps {
  onVideoUpload?: (videoId: string) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onVideoUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTimestamp, setRecordingTimestamp] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <p>Loading or not signed in...</p>;
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        let chunks: BlobPart[] = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = async () => {
          const videoBlob = new Blob(chunks, { type: 'video/mp4' });
          chunks = [];
          const timestamp = `${user?.id}_${Date.now()}`;
          setRecordingTimestamp(timestamp);
          captureThumbnail(timestamp);
          await uploadVideo(videoBlob, timestamp);
          if (onVideoUpload) {
            onVideoUpload(timestamp);
          }
        };
      })
      .catch(console.error);
  }, [user, onVideoUpload]);

  const handleToggleRecording = () => {
    if (isRecording) {
      mediaRecorder?.stop();
    } else {
      mediaRecorder?.start();
    }
    setIsRecording(!isRecording);
  };

  const captureThumbnail = (timestamp: string) => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          uploadThumbnail(blob, timestamp);
        }
      }, 'image/jpeg');
    }
  };

  const uploadThumbnail = async (blob: Blob, timestamp: string) => {
    try {
      const thumbRef = storageRef(storage, `thumbnails/${timestamp}.jpg`);
      await uploadBytes(thumbRef, blob);
      console.log('Thumbnail uploaded!');
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
    }
  };

  const uploadVideo = async (videoBlob: Blob, timestamp: string) => {
    try {
      console.log("Uploading video with timestamp:", timestamp);
      const videoFileRef = storageRef(storage, `videos/${timestamp}.mp4`);
      const snapshot = await uploadBytes(videoFileRef, videoBlob);
      console.log('Uploaded a blob or file!', snapshot.ref.fullPath);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#1B1B1B', height: '658px'  }} className="p-8 rounded-lg">
      <video ref={videoRef} autoPlay muted className="w-full h-auto rounded-lg"></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleToggleRecording}
          className="p-4 rounded-full focus:outline-none"
        >
          {isRecording ? (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="35" stroke="#F2F2F2" strokeWidth="2"/>
              <rect x="22" y="23" width="27" height="27" rx="1" fill="#D73939"/>
            </svg>
          ) : (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="27" fill="#D73939"/>
              <circle cx="36" cy="36" r="35" stroke="#D73939" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoRecorder;
