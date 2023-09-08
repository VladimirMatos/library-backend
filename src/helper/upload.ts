import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyDULQYM6go6OxBVNtn0UM3dmuQD4izDE-g',
  authDomain: 'e-library-ef80c.firebaseapp.com',
  projectId: 'e-library-ef80c',
  storageBucket: 'e-library-ef80c.appspot.com',
  messagingSenderId: '524936099166',
  appId: '1:524936099166:web:ed8c99862e9cba5fbc4bcf',
  measurementId: 'G-W27S4R7PL9',
};

type image = {
  base64: string;
  name: string;
  file: string;
};

export const uploadImage = async (image: image) => {
  try {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const imageUrl = image.name + uuidv4();

    const storageRef = ref(storage, `${image.file}/${imageUrl}`);
    await uploadString(storageRef, image.base64, 'data_url');
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    throw error;
  }
};
