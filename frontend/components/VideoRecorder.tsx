import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../lib/firebase/firebaseConfig.d'; // Adjust path as necessary
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/nextjs';

const VideoRecorder = () => {
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
        };
      })
      .catch(console.error);
  }, [user]);

  const handleStartRecording = () => {
    mediaRecorder?.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
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
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <p>Last recording timestamp: {recordingTimestamp}</p>
    </div>
  );
};

export default VideoRecorder;