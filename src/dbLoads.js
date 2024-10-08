import { getFirestore,collection, query, getDocs,doc, setDoc,orderBy, limit,getCountFromServer, startAfter, startAt, where, limitToLast, endAt } from "firebase/firestore";
import {getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";

import {app} from './firebase.js'



const db = getFirestore(app);
const storage = getStorage(app,'gs://photo-collection-b91ff.appspot.com')
const collectionsData = collection(db, "collections_data")

export const loadLastId = async () =>{
    var q = query(collectionsData, orderBy('id'), limitToLast(1));
    const snapshot =  await getDocs(q); 
    return snapshot
}

export const loadPostsLenght = async (category) =>{
    if(category === 0){
        const snapshot = await getCountFromServer(collectionsData,);
        return await snapshot.data().count
    }else{
        var q = query(collectionsData, where("category", "==", category));
        const temp = await getDocs(q)
        return temp.docs.length
    }
}
export const loadUserPostsLenght = async (category,userID) =>{
    var q = null
    if(category === 0){
        q = query(collectionsData, where("userID", "==", userID));
    }else{
        q = query(collectionsData, where("category", "==", category), where("userID", "==", userID));
    }
    const temp = await getDocs(q)
    return temp.docs.length
}

export const loadDocSnapshots = async (pageChanging,category,firstSnapEl,lastSnapEl) =>{
    const documentOrder = pageChanging >= 0 ? 'asc' : 'desc'
    const pointOfMoveSnap = pageChanging > 0 ? lastSnapEl : firstSnapEl
    if(pageChanging === 0){
        if(category === 0)
            var q = query(collectionsData, orderBy('id', documentOrder), startAt(firstSnapEl), limit(4));
        else
            var q = query(collectionsData, where("category", "==", category),orderBy("id",documentOrder),startAfter(firstSnapEl), limit(4));
        return await getDocs(q);
    }
    else{
        if(category === 0)
            var q = query(collectionsData, orderBy('id', documentOrder), startAfter(pointOfMoveSnap), limit(4 * (pageChanging ? Math.abs(pageChanging) : 1)));
        else
            var q = query(collectionsData, where("category", "==", category),orderBy("id",documentOrder),startAfter(pointOfMoveSnap), limit(4 * (pageChanging ? Math.abs(pageChanging) : 1)));
        return await await getDocs(q); 
    }
} 
export const loadUserDocSnapshots = async(pageChanging,category,firstSnapEl,lastSnapEl,userID) =>{
    const documentOrder = pageChanging >= 0 ? 'asc' : 'desc'
    const pointOfMoveSnap = pageChanging > 0 ? lastSnapEl : firstSnapEl
    console.log(pointOfMoveSnap)
    if(pageChanging === 0){
        if(category === 0)
            var q = query(collectionsData, where("userID", "==", userID), orderBy('id', documentOrder), startAfter(firstSnapEl), limit(4));
        else
            var q = query(collectionsData, where("userID", "==", userID), where("category", "==", category),orderBy("id",documentOrder),startAfter(firstSnapEl), limit(4));
        return await getDocs(q);
    }
    else{
        if(category === 0)
            var q = query(collectionsData, where("userID", "==", userID), orderBy('id', documentOrder), startAfter(pointOfMoveSnap), limit(4 * (pageChanging ? Math.abs(pageChanging) : 1)));
        else
            var q = query(collectionsData, where("userID", "==", userID), where("category", "==", category),orderBy("id",documentOrder),startAfter(pointOfMoveSnap), limit(4 * (pageChanging ? Math.abs(pageChanging) : 1)));
        return await getDocs(q); 
    }
}

export const fileLoader = async (files) =>  {
    var temp_array = []
    for(var i = 0; i < files.length; i++){
        const storageRef = ref(storage, files[i].name);
        const upload = await uploadBytes(storageRef, files[i])
        var a = await getDownloadURL(upload.ref)
        temp_array.push(a)
    } 
    return temp_array
}
export const uploadPost = (post) =>{
    var name = new Date().toDateString() + ':' + new Date().toTimeString()
    setDoc(doc(db, "collections_data", (name)), post);
}

export const searchingName = async (filter) =>{
    var q = query(collectionsData,orderBy('name'), startAfter(filter), endAt(filter + '\uf8ff'));
    return await getDocs(q); 
}
