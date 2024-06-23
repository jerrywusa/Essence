// getDownloadUrl.ts
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../lib/firebase/firebaseConfig.d'; // Adjust the path as needed

const getDownloadUrl = async (fileName: string): Promise<string> => {
  try {
    const fileRef = ref(storage, fileName);
    const url = await getDownloadURL(fileRef);
    console.log('File available at', url);
    return url;
  } catch (error) {
    console.error('Error getting download URL', error);
    throw error;
  }
};

export default getDownloadUrl;
