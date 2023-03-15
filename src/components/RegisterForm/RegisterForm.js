import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./RegisterForm.css"
const registerForm_utils = require("./RegisterForm_utils")
const errorMassageList = require("../../assets/errorMassageList")


const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const Navigate = useNavigate()
    const LoginPath = "/Login"

    const jsxErrorMessage = (errorName) => 
        errorName === errorMessage.name && (<div className="error">{errorMessage.message}</div>)

    const handleRegisterSubmit = (event) => {
        // prevent from refresh the page
        event.preventDefault();
        // get the inputs
        var {userNameInput, passwordInput, confirmPasswordInput, isAdmin} = document.forms[0]
        // ask the server if userName and password are valid
        var isUserNameValid = registerForm_utils.isUserNameValid(userNameInput.value)

        if (isUserNameValid) {
            var isPasswordValid = registerForm_utils.isPasswordValid(passwordInput.value, confirmPasswordInput.value)
            if (isPasswordValid) {
                setIsSubmit(true)
                setTimeout(() => {
                    Navigate(LoginPath)
                  }, 2000);
            }
            else {
                setErrorMessage({ name: "RegisterPassword" , message: errorMassageList.errors.RegisterPassword})
            }
        }
        else {
            setErrorMessage({ name: "RegisterUserNameInvalid" , message: errorMassageList.errors.RegisterUserNameInvalid})
        }


    }
    const handleBackButton = () => {
        console.log("in handleBackButton")
        setErrorMessage({})
        // go to register page
        Navigate(LoginPath)
    }

    const jsxRegisterForm = (
        <div className="formDiv">
        <form onSubmit={handleRegisterSubmit}>
            <div className="RegisterInput-container">
                <label>User Name</label>
                <input type="text" name="userNameInput" required/>
                {jsxErrorMessage("RegisterUserNameInvalid")}
            </div>
            <div className="RegisterInput-container">
                <label>Password</label>
                <input type="password" name="passwordInput" required/>
            </div>
            <div className="RegisterInput-container">
                <label>Confirm Password</label>
                <input type="password" name="confirmPasswordInput" required/>
                {jsxErrorMessage("RegisterPassword")}
            </div>
            <div className="RegisterAdminInput-container">
                <label>Admin</label>
                <input type="checkbox" name="isAdmin"/>
            </div>
            <div className="button-container">
                <input type="button" value="Back" onClick={handleBackButton}/>
                <input type="submit" value="Sign Up"/>
            </div>
        </form>
    </div>
    )


    return (
        <div className="registerForm-container">
            <div className="registerForm">
                <div className="registerTitle">Register</div>
                {isSubmit ? <div>User is Successfully Sign Up</div> : jsxRegisterForm}
            </div>
        </div> 
    )
}



export default RegisterForm