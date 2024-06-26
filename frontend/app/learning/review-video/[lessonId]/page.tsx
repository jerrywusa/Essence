'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import VideoPlayer from '../../watch-video/VideoPlayer'; // Adjust the import path as needed

import Image from 'next/image';
import sceneImage from '../../../../public/images/wows.jpeg'; // Replace with the correct path
import yourTakeImage from '../../../../public/images/littleWomen.png'; // Replace with the correct path
import { Progress } from '@/components/ui/progress'; // Import the Progress component from shadcn
import { Context } from '@/app/page';
import getDownloadUrl from '../getDownloadUrl';

const Page = () => {
  const { lessons } = useContext(Context);
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId')
  const [progress, setProgress] = useState(); // Set the progress value
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [advice, setAdvice] = useState('');

  const lesson = lessons.find((lesson) => lesson.lessonId === lessonId);

  
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getDownloadUrl(`/videos/${videoId}.mp4`);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video URL', error);
      }
    };

    fetchUrl();
  }, [`/videos/${videoId}.mp4`]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/analyze-audio?lesson_id=${lessonId}&video_id=${videoId}.mp4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setProgress(data.performance_score);
      setAdvice(data.advice);
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (loading) {
    console.log(videoId);
    console.log("fetching");
    setLoading(false);
    fetchData();
    console.log("hefsaleoeo");
  }

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const videoStyle = {
    borderRadius: 10,
    width: 635,
    height: 336,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div style={{ marginLeft: '70px' }} className="min-h-screen bg-[#101010]">
      <div style={{ width: 1372 }} className="bg-[#1B1B1B] p-6 rounded-lg">
      <div className="flex mb-6">
          <div className="w-1/2 pr-2">
            <h2 style={{ marginBottom: '24px', marginLeft: '12px' }} className="text-2xl font-bold text-white mb-2">The Scene</h2>
            <VideoPlayer
              link={lesson.videoLink}
              style={videoStyle}
              videoId={`${lessonId}-scene`}
            />
          </div>
          <div className="w-1/2 pl-2">
            <h2 style={{ marginBottom: '24px', marginLeft: '12px' }} className="text-2xl font-bold text-white mb-2">Your Take</h2>
            <VideoPlayer
              link={videoUrl}
              style={videoStyle}
              videoId={`${lessonId}-your-take`}
            />
          </div>
        </div>
        <div className="bg-[#1B1B1B] p-4 rounded-lg">
          <h2 style={{ marginTop: '0' }} className="text-2xl font-bold text-white mb-2">Let's see how you did</h2>
          <div className="flex items-center mb-4">
            <div className="w-1/2 pr-4 flex flex-col items-center">
              <h3 className="text-6xl font-bold text-white mb-2">{progress}%</h3>
              
              <Progress value={progress} style={{color: 'red'}} className="w-full rounded mt-2 [&>*]:bg-red-600" />
              <p
  style={{
    color: '#FFFFFF',
    opacity: 0.75, // 75% pass-through
    marginTop: '24px', // 24px marginTop
  }}
  className="text-xl font-bold"
>
  Your Score
</p>

            </div>
            <div
              style={{
                color: '#F2F2F2',
                opacity: 0.75,
                lineHeight: '1.5',
                fontWeight: 'bold',
                fontSize: '24px',
              }}
              className="w-1/2 pl-4"
            >
              <p>
                {advice}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button className="bg-gray-700 text-white py-2 px-4 rounded" onClick={() => router.push(`/home`)}>Go home</button>
          <button className="bg-red-600 text-white py-2 px-4 rounded" onClick={() => router.push(`/learning/watch-video/${lessonId}`)}>Practice again!</button>
        </div>
      </div>
    </div>
  );
};

export default Page;




  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/analyze-audio?video_id=${videoId}.mp4`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setResults(data);
  //   } catch (err) {
  //     setError((err as Error).message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (loading) return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-900">
  //     <Spinner />
  //   </div>
  // );
  // if (error) return <p>Error: {error}</p>;