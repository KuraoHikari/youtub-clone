import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBDX5_XJwhQAv_tKul1mx4yGxCw4u_Xj8k',
  authDomain: 'video-app-3d5d0.firebaseapp.com',
  projectId: 'video-app-3d5d0',
  storageBucket: 'video-app-3d5d0.appspot.com',
  messagingSenderId: '67267536430',
  appId: '1:67267536430:web:db9cb7400465732b6e61bf',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
