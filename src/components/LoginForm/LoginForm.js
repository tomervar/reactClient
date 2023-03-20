import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"
const loginForm_utils = require("./LoginForm_utils")
const errorMassageList = require("../../assets/errorMassageList")


const LoginForm = () => {

    const [errorMessage, setErrorMessage] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const Navigate = useNavigate()
    const RegisterPath = "/Register"
    const ActoinScreenPath = "/ActoinScreen"
    
    const jsxErrorMessage = (errorName) => 
        errorName === errorMessage.name && (<div className="error">{errorMessage.message}</div>)


    const handleLoginSubmit = async (event) => {
        // prevent from refresh the page
        event.preventDefault();
        // get the inputs
        var {userNameInput, passwordInput} = document.forms[0]
        // ask the server if userName and password are valid
        var isValid = loginForm_utils.isValid(userNameInput.value, passwordInput.value)
        if (isValid) {
            setIsSubmit(true)
            // await setTimeout(5000);
            // Navigate(ActoinScreenPath)
            setTimeout(() => {
                Navigate(ActoinScreenPath)
              }, 3000);
        }
        else {
            setErrorMessage({ name: "LogInInvalid" , message: errorMassageList.errors.LogInInvalid})
        }
    }
    const handleRegisterButton = () => {
        
        setErrorMessage({})
        // go to register page
        Navigate(RegisterPath)
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