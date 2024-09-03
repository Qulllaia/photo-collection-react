import {initializeApp} from 'firebase/app'
const firebaseConfig = {
    apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
    authDomain: "photo-collection-b91ff.firebaseapp.com",
    projectId: "photo-collection-b91ff",
    storageBucket: "photo-collection-b91ff.appspot.com",
    messagingSenderId: "126437229754",
    appId: String(process.env.REACT_APP_FIREBASE_APP_ID)
};
console.log(firebaseConfig)
export const app = initializeApp(firebaseConfig);

