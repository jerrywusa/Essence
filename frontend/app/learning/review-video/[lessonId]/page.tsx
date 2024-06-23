'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId')// Extract the videoId from params
  // const [ videoID, setVideo ] = useState(null);
  // setVideo(videoId);  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/analyze-audio?video_id=${videoId}.mp4`, {
          // const response = await fetch('http://localhost:8000/analyze-audio?video_id=user_2iFXbXatWxHFSmk6oSxy9BHiVuF_1719125034209.mp4', {
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
    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ backgroundColor: '#101010', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Review Page</h1>
      <p style={{ color: 'white', fontSize: '1.25rem' }}>Video ID: {videoId}</p>
      {results && (
        <div style={{ color: 'white', fontSize: '1rem', marginTop: '1rem' }}>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;
