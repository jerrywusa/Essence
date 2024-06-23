// firebaseService.ts
import { db } from '../firebase/firebaseConfig.d';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Save video path to Firestore
 * @param videoPath Path of the video in Firebase Storage
 */
export const saveVideoPath = async (videoPath: string) => {
  console.log('Saving video path to Firestore...');
  const videoDocRef = doc(db, 'videos', `video-${Date.now()}`);
  await setDoc(videoDocRef, { path: videoPath, createdAt: new Date() });
  console.log('Video path saved to Firestore!');
};
