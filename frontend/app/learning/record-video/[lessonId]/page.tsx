"use client";
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useState, useContext, FunctionComponent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Context } from '@/app/page'; // Adjust the import based on your actual path
import { LessonType } from '../../../types';

const VideoRecorder = dynamic(() => import('../../../../components/VideoRecorder'), {
  ssr: false
});

interface RecordVideoProps {
  params: {
    lessonId: string;
  };
}

const RecordVideo: FunctionComponent<RecordVideoProps> = ({ params }) => {
  const { user, isSignedIn } = useUser(); // Using Clerk's useUser hook for client-side user data
  const [lastVideoId, setLastVideoId] = useState<string | null>(null);
  const router = useRouter();
  const { lessons } = useContext(Context);
  const lessonId = params.lessonId;

  const lesson = lessons.find((lesson: LessonType) => lesson.lessonId === lessonId); // Find the lesson based on the lessonId

  const handleVideoUpload = (videoId: string) => {
    setLastVideoId(videoId);
    console.log('Last video ID:', videoId);
    router.push(`/learning/review-video/${lessonId}?videoId=${videoId}`);
  };

  if (!isSignedIn) {
    return <p>Loading or not signed in...</p>;
  }

  if (!lesson) {
    return <p>Lesson not found...</p>;
  }

  const ScriptComponent = lesson.scriptComponent;

  return (
    <div style={{ backgroundColor: '#101010' }} className="min-h-screen text-white p-16">
      <div className="flex space-x-8">
        <div className="w-1/2">
          <VideoRecorder onVideoUpload={handleVideoUpload} />
        </div>
        <div className="w-1/2">
          {ScriptComponent && <ScriptComponent />}
        </div>
      </div>
    </div>
  );
};

export default RecordVideo;
