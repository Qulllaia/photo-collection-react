import { GrClose } from "react-icons/gr"
import {useState} from 'react'
import { signUpMethod,signInMethod } from "../auth.js";

export const Authentification = ({authentificationModal, setAuthentificationModal}) =>{
    const [doesAccountExist, setDoesAccountExist] = useState(false);
    const [error, setError] = useState('');
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
                                signInMethod(signInData[0],signInData[1])
                                .then((exception)=>{
                                    if(exception){
                                        setError(exception)
                                    }
                                    else{
                                        setError(null)
                                        setAuthentificationModal(false)
                                    }
                                })
                            }}>
                                <h2>Авторизоваться</h2>
                                <h7 className={`show-error ${error ? 'active' : ''}`}> {error}  </h7>
                                <h3>Ваша электронная почта</h3>
                                <input className='user-email' placeholder='Email'name="email"></input>
                                <h3>Ваш пароль</h3>
                                <input className='user-password' placeholder='Password'name="password" ></input>
                                <button type='submit'>Войти в аккаунт</button>
                            </form>
                            <a onClick={()=>{
                                setDoesAccountExist(false)
                                setError(null)
                                }}>На самом деле у меня нет аккаунта..</a>
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
                                .then((e)=>{
                                    if(e){
                                        setError(e)
                                    }
                                    else{
                                        setError(null)
                                        setAuthentificationModal(false)
                                    }
                                })
                                    
                            }}>
                                <h2>Зарегистрироваться</h2>
                                <h7 className={`show-error ${error ? 'active' : ''}`}> {error}  </h7>
                                <h3>Ваша электронная почта</h3>
                                <input className='user-email' name="email" placeholder='Email'></input>
                                <h3>Ваш пароль</h3>
                                <input className='user-password' name="password" placeholder='Password' ></input>
                                <button type='submit'>Зарегистрироваться</button>
                            </form>
                            <a onClick={()=>{
                                setDoesAccountExist(true)
                                setError(null)
                                }}>У меня уже существует аккаунт!</a>
                        </>
                }
            </div>
        </div>
      )
}