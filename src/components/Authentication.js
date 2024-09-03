import { GrClose } from "react-icons/gr"
import {useState} from 'react'
import { signUpMethod,signInMethod } from "../auth.js";

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
                                var signInData = []
                                e.preventDefault()
                                var formData = new FormData(e.target);
                                for (var element of formData.entries()) {
                                    signInData.push(element[1])
                                }
                                console.log(signInData)
                                signInMethod(signInData[0],signInData[1])
                                setAuthentificationModal(false)
                            }}>
                                <h2>Авторизоваться</h2>
                                <h3>Ваша электронная почта</h3>
                                <input className='user-email' placeholder='Email'name="email"></input>
                                <h3>Ваш пароль</h3>
                                <input className='user-password' placeholder='Password'name="password" ></input>
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
                                    signUpData.push(element[1])
                                }
                                signUpMethod(signUpData[0],signUpData[1])
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