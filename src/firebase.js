import {initializeApp} from 'firebase/app'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API || 'mock_key',
    authDomain: "photo-collection-b91ff.firebaseapp.com",
    projectId: "photo-collection-b91ff",
    storageBucket: "photo-collection-b91ff.appspot.com",
    messagingSenderId: "126437229754",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
export const app = initializeApp(firebaseConfig);

