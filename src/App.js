import { useEffect,useState } from 'react';
import {loadDocSnapshots,loadPostsLenght,loadLastId,uploadPost} from './dbLoads.js'

import { Collection } from './components/Collection.js';
import { NewPostCollection } from './components/ModalNewPost.js';
import { OpenImage } from './components/OpenImage.js';
import { Authentification } from './components/Authentication.js';

import './css/main.css'
import { IoIosAddCircle,IoIosPerson, IoMdSearch,IoIosExit  } from "react-icons/io";
import { signOutMethod,getUserID } from './auth.js';




const cats =  [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [filter, setFilter] = useState('');
  
  const [isLoading, setLoading] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [newPostModal, setNewPostModal] = useState(false);
  const [authentificationModal, setAuthentificationModal] = useState(false);
  const [userID, setUserID] = useState(null);
  
  const [collections, setData] = useState([]);
  const [newCollection, setNewData] = useState({});
  
  const [postsCount, setPostsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageChanging, setPageChanging] = useState(1);
  const [lastSnapEl,setLastSnapEl] = useState(null)
  const [firstSnapEl,setFirstSnapEl] = useState(0)
  const [lastId, setLastId] = useState(1)
  

  useEffect(()=>{
    if(Object.keys(newCollection).length > 0){
      uploadPost(newCollection)
    }
  },[newCollection])

  useEffect(()=>{
    setUserID(getUserID())
    setLoading(true)
    loadDocSnapshots(pageChanging,categoryId,firstSnapEl,lastSnapEl)
    .then((_docSnap)=>{
      var snapshotsList = []
      var resultSnapshotList = []

      _docSnap.forEach((doc) => {
        snapshotsList.push(doc.data());
      });
      if(pageChanging !== 0){
        snapshotsList.slice(((Math.abs(pageChanging)-1)*4),(Math.abs(pageChanging)*4)).forEach((res)=>{
            if(pageChanging >= 0)
              resultSnapshotList.push(res)
            else
              resultSnapshotList.unshift(res);  
        });
        if(resultSnapshotList.length > 0){
          setFirstSnapEl(resultSnapshotList[0].id)
          setLastSnapEl(resultSnapshotList[resultSnapshotList.length-1].id)
        }
      }else{
        snapshotsList.forEach((res)=>{
            resultSnapshotList.push(res)
        });
      }
      return resultSnapshotList
    })
    .then((snapshotList)=>setData(snapshotList))
    // .catch((e)=>alert(e))
    .finally(()=>{
        setLoading(false)
        setPageChanging(0)

    })  
    loadPostsLenght(categoryId).then((res)=>setPostsCount(res)).catch((e)=>alert(e))
    loadLastId().then((res)=>setLastId(res.docs[0].data().id)).catch((e)=>alert(e))
  },[categoryId,page,newCollection])

  return (
    <div className="App">
      <div className='side-bar'>
        <div className='add-post' onClick={()=>setNewPostModal(true)}>
          <IoIosAddCircle className='add-icon'/>
          <div className='add-post-text'>Добавить пост</div>
        </div>
        {userID === null ? 
          <div className='sign-in-reg' onClick={()=>{setAuthentificationModal(true)}}>
            <IoIosPerson className='sign-in-icon'/>
            <div className='sign-in-text'>Войти в аккаунт</div>
          </div>
        :
          <div className='sign-out-reg' onClick={()=>signOutMethod()}>
            <IoIosExit className='sign-in-icon'/>
            <div className='sign-out-text'>Выйти из аккаунта</div>
          </div>
        }
      </div>
      <div className='main-content'>
        <h1>Моя коллекция фотографий</h1>
        <div className="navigation">
          <div className="tags">
            <ul>
              {cats.map((cat,index)=>(
              <li
                  className={categoryId === index ? 'active':'not-active'}
                  key={cat.name}
                  onClick={()=>{
                    setCategoryId(index)
                    setFirstSnapEl(0)
                    setLastSnapEl(null)
                    setPage(1)
                    setPageChanging(1)
                  }}
                  >{cat.name}</li>
              ))}
            </ul>
            <input
              placeholder='Найти тему' 
              onChange={(e)=>{
                setFilter(e.target.value)
              }}
              />
              <IoMdSearch className="search-button"
              onClick={()=>
                setCategoryId(0)
                }></IoMdSearch>
          </div>
        </div>
        <div className="photos">
          {
          !isLoading ? 
          collections.map((collection) =>(
            <Collection
              key={collection.name}
              name={collection.name}
              images={collection.photos}
              setFullScreenImage={setFullScreenImage}></Collection>
          )
          ): <h2>Идёт загрузка</h2>}
        </div>
        <div className="footer">
          <ul>
            {
              [...Array(Math.ceil(postsCount/4))].map((_,index)=>(
                <li
                  key={index}
                  className={page === (index+1) ? "active":'non-active'}
                  onClick={()=>{
                    if((index+1)-page !== 0)
                      setPageChanging((index+1)-page)
                    setPage(index+1)
                  }}
                  >{index+1}</li>
              ))
            }
            
          </ul>
        </div>
      </div>
      <OpenImage 
      fullScreenImage = {fullScreenImage} 
      setFullScreenImage={setFullScreenImage}></OpenImage>
      <NewPostCollection 
      id={lastId} 
      categories = {cats} 
      newPostModal={newPostModal}
      setNewPostModal = {setNewPostModal} 
      setNewData={setNewData}></NewPostCollection>
      <Authentification
      authentificationModal={authentificationModal}
      setAuthentificationModal = {setAuthentificationModal}
      ></Authentification>
    </div>
  );
}

export default App;
