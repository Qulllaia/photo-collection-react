import {app} from './firebase.js'

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app)
// onAuthStateChanged(auth, (user) =>{
//     console.log(auth.currentUser ? auth.currentUser.uid : null)
// })

export const signUpMethod = (email,password) =>{
    return createUserWithEmailAndPassword(auth,email,password)
    .then(()=>null)
    .catch((e)=>{
        if(e.message === 'Firebase: Error (auth/email-already-in-use).'){
            return 'Данная почта уже занята кем-то'
        }
        else if(e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            return 'Ваш пароль меньше 6 символов'   
        }
        else{
            return e.message
        }
    })
}

export const signInMethod = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
    .then(()=>null)
    .catch((e)=>{
        if(e.message === 'Firebase: Error (auth/invalid-credential).'){
            return 'Неверный логин или пароль'
        }
        else if(e.message === 'Firebase: Error (auth/missing-password).'){
            return 'Введите ваш пароль'   
        }
        else{
            return e.message
        }
    })
}
export const signOutMethod = () => signOut(auth)

export const getAuthData = () => auth