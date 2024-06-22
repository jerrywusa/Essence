import dynamic from 'next/dynamic';

const VideoRecorder = dynamic(() => import('../../components/VideoRecorder'), {
  ssr: false
});

const Page = () => {
  return (
    <div>
      <h1>Video Recording Page</h1>
      <VideoRecorder />
    </div>
  );
};

export default Page;
