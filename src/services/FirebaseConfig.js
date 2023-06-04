import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHDSnyglVCuagA11fWw8VNLTmqcPkr9gc',
  authDomain: 'trabalho-app-d7276.firebaseapp.com',
  projectId: 'trabalho-app-d7276',
  storageBucket: 'trabalho-app-d7276.appspot.com',
  messagingSenderId: '739720199546',
  appId: '1:739720199546:web:97bbd6b9b06244a4592ac3',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
