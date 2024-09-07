import { GrClose } from "react-icons/gr"
import {useEffect, useState} from 'react'

import {fileLoader} from '../dbLoads.js'


const cats =  {
    "Море": 1 ,
    "Горы": 2,
    "Архитектура": 3 ,
    "Города": 4
}


export const NewPostCollection = ({id,categories,newPostModal,setNewPostModal,setNewData, userID}) =>{
    const [fileURLs, setFileURLs] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');

    
    var newData = {}
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!isLoading)
            event.target.reset();
    }

    useEffect(() => {
        if(isSubmit){
            newData.id = (id+1)
            newData.category=category
            newData.name=name 
            newData.photos=fileURLs
            newData.userID = userID
            setNewData(newData)
            setNewPostModal(false)}
            setSubmit(false)
        }, [isSubmit]);
    return(
        <div className={`modal-new-post${newPostModal ? '' : ' not-visible'}`}>
                <div className={`modal-window${newPostModal ? '' : ' not-visible'}`}>
                <GrClose className='close-button'onClick={()=>{
                    setNewPostModal(false)
                }}/>
                <form className="form-post" onSubmit={handleSubmit}>
                    <h2>Создать коллекцию</h2>
                    <h3>Название коллекции</h3>
                    <input className='post-title' placeholder='Название' 
                    onChange={(event)=>{
                        setName(event.target.value)
                    }}></input>
                    <h3>Тег для коллекции</h3>
                    <select onChange={(event)=>{
                        setCategory(cats[event.target.value])
                    }}>
                        {categories.map((cat)=>(
                            <option key={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <h3>Картинки для коллекции</h3>
                    <span className={`isLoading ${isLoading ? 'true' : 'false'}`}>Идёт загрузка...</span>
                    <input type='file' multiple="multiple" accept="image/*" 
                    onChange={(event)=>{
                        setLoading(true)
                        event.preventDefault();
                        fileLoader(event.target.files)
                        .then((res)=>{
                            setFileURLs([...res])
                        })
                        .finally(()=>{setLoading(false)})
                                   
                    }}></input>
                    <button type='submit' onClick={()=>{
                        if(!isLoading && newData.photos !== null)
                            setSubmit(true)
                    }}>Отправить</button>
                </form>
            </div>
        </div>
      )
}
