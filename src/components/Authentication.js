import { GrClose } from "react-icons/gr"
import {useEffect, useState} from 'react'
import { signUpMethod } from "../auth";

export const Authentification = ({authentificationModal, setAuthentificationModal}) =>{
    const [doesAccountExist, setDoesAccountExist] = useState(false);
    return(
        <div className={`modal-new-post${authentificationModal ? '' : ' not-visible'}`}>
                <div className={`modal-window-authentication${authentificationModal ? '' : ' not-visible'}`}>
                <GrClose className='close-button'onClick={()=>{
                    setAuthentificationModal(false)
                }}/>
                {
                    doesAccountExist ? 
                        <>
                            <form className="Authentication" onSubmit={(e)=>{
                                e.preventDefault()
                                console.log(e.target.value)
                            }}>
                                <h2>Авторизоваться</h2>
                                <h3>Ваша электронная почта</h3>
                                <input className='user-email' placeholder='Email'></input>
                                <h3>Ваш пароль</h3>
                                <input className='user-password' placeholder='Password' ></input>
                                <button type='submit'>Войти в аккаунт</button>
                            </form>
                            <a onClick={()=>setDoesAccountExist(false)}>На самом деле у меня нет аккаунта..</a>
                        </>
                    :
                        <>
                            <form className="Registration" onSubmit={(e)=>{
                                var signUpData = []
                                e.preventDefault()
                                var formData = new FormData(e.target);
                                for (var element of formData.entries()) {
                                    signUpData.push(element)
                                }
                                signUpMethod(...signUpData)
                                setAuthentificationModal(false)
                            }}>
                                <h2>Зарегистрироваться</h2>
                                <h3>Ваша электронная почта</h3>
                                <input className='user-email' name="email" placeholder='Email'></input>
                                <h3>Ваш пароль</h3>
                                <input className='user-password' name="password" placeholder='Password' ></input>
                                <button type='submit'>Зарегистрироваться</button>
                            </form>
                            <a onClick={()=>setDoesAccountExist(true)}>У меня уже существует аккаунт!</a>
                        </>
                }
            </div>
        </div>
      )
}