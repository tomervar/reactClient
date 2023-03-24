import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

import "./LoginForm.css"
import axios from "axios"
const errorMassageList = require("../../assets/errorMassageList")


const LoginForm = () => {

    const { setAuth } = useAuth();
    const [errorMessage, setErrorMessage] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const Navigate = useNavigate()
    
    const jsxErrorMessage = (errorName) => 
        errorName === errorMessage.name && (<div className="error">{errorMessage.message}</div>)


    const handleLoginSubmit = async (event) => {
        // prevent from refresh the page
        event.preventDefault();
        // get the inputs
        var {userNameInput, passwordInput} = document.forms[0]
        // ask the server if userName and password are valid

        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_LOGIN_URL}`,
                JSON.stringify({ username: userNameInput.value, password: passwordInput.value }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            )
            const access_token = response?.data?.access_token
            setAuth({ access_token })
            setIsSubmit(true)
            setTimeout(() => {
                Navigate(process.env.REACT_APP_ACTION_SCREEN)
              }, 3000);
        } catch (err) {
            setErrorMessage({ name: "LogInInvalid" , message: errorMassageList.errors.LogInInvalid})
        }
    }
    const handleRegisterButton = () => {
        
        setErrorMessage({})
        // go to register page
        Navigate(process.env.REACT_APP_REGISTER_URL)
    }

    const jsxLoginForm = (
        <div className="formDiv">
            <form onSubmit={handleLoginSubmit}>
                <div className="loginInput-container">
                    <label>User Name</label>
                    <input type="text" name="userNameInput" required/>
                </div>
                <div className="loginInput-container">
                    <label>Password</label>
                    <input type="password" name="passwordInput" required/>
                </div>
                {jsxErrorMessage("LogInInvalid")}
                <div className="button-container">
                    <input type="submit" value="Login"/>
                    <input type="button" value="Register" onClick={handleRegisterButton}/>
                </div>
            </form>
        </div>
    )

    return (
        <div className="loginForm-container">
            <div className="loginForm">
                <div className="loginTitle">Sign In</div>
                {isSubmit ? <div>User is Successfully logged in</div> : jsxLoginForm}
            </div>
        </div> 
    )
} 

export default LoginForm