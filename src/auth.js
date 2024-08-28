import {app} from './firebase.js'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app)

export const signUpMethod = ({email,password}) =>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        console.log(userCredential.user)
    })
}