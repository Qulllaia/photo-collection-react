import {app} from './firebase.js'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app)
onAuthStateChanged(auth, (user) =>{
    console.log(auth.currentUser ? auth.currentUser.uid : null)
})

export const signUpMethod = (email,password) =>{
    createUserWithEmailAndPassword(auth,email,password)
}

export const signInMethod = (email,password)=>{
    signInWithEmailAndPassword(auth,email,password)
}
export const signOutMethod = () => signOut(auth)

export const getUserID = () => {
    console.log(auth.currentUser ? auth.currentUser.lastNotifiedUid : null)    
    return auth.currentUser ? auth.currentUser.lastNotifiedUid : null
}