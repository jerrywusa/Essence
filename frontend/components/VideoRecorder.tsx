"use client";

import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../lib/firebase/firebaseConfig.d'; // Adjust path as necessary
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { saveVideoPath } from '@/lib/firebase/firebaseService';

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
navigator.mediaDevices.getUserMedia({ video: true, audio: true }) // Include audio in the recording
    .then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      let chunks: BlobPart[] = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = async () => {
        console.log("Uploading video...");
        const videoBlob = new Blob(chunks, { type: 'video/mp4' }); // You might want to adjust the MIME type if necessary
        chunks = [];
        await uploadVideo(videoBlob);
      };
    })
    .catch(console.error);
}, []);

  const handleStartRecording = () => {
    console.log("Starting recording...");
    mediaRecorder?.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const uploadVideo = async (videoBlob: Blob) => {
    try {
      console.log("Uploading video... 2");
      const videoFileRef = storageRef(storage, `videos/${Date.now()}.mp4`);
      const snapshot = await uploadBytes(videoFileRef, videoBlob);
      console.log('Uploaded a blob or file!', snapshot.ref.fullPath);
      await saveVideoPath(snapshot.ref.fullPath);
    } catch (error) {
      console.error('Error uploading video:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
    </div>
  );
};

export default VideoRecorder;
