import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./RegisterForm.css"
import axios from "axios";
const registerForm_utils = require("./RegisterForm_utils")
const errorMassageList = require("../../assets/errorMassageList")

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const Navigate = useNavigate()

    const handleOnAdminChange = () => {
        setIsAdmin(!isAdmin)
    }

    const jsxErrorMessage = (errorName) => 
        errorName === errorMessage.name && (<div className="error">{errorMessage.message}</div>)

    const handleRegisterSubmit = async (event) => {
        // prevent from refresh the page
        event.preventDefault();
        // get the inputs
        const {userNameInput, passwordInput, confirmPasswordInput} = document.forms[0]
        const userNameValue = userNameInput.value;
        const passwordValue = passwordInput.value;
        // check if password are the same as confirmPassword
        var isPasswordValid = registerForm_utils.isPasswordValid(passwordInput.value, confirmPasswordInput.value)
        var isValid = false
        if(isPasswordValid) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_REGISTER_URL}`,
                    JSON.stringify({ username: userNameValue, password: passwordValue, isAdmin: isAdmin }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    
                    }
                )
                isValid = true
            } catch (err) {
                console.log(err)
                isValid = false
            }

            if(isValid){
                setIsSubmit(true)
                setTimeout(() => {
                    Navigate(process.env.REACT_APP_LOGIN_URL)
                  }, 2000);
            }
            else{
                setErrorMessage({ name: "RegisterUserNameInvalid" , message: errorMassageList.errors.RegisterUserNameInvalid})
            }
        }   
        else{
            setErrorMessage({ name: "RegisterPassword" , message: errorMassageList.errors.RegisterPassword})
        }
    }

    const handleBackButton = () => {
        setErrorMessage({})
        setIsAdmin(false)
        // go to login page
        Navigate(process.env.REACT_APP_LOGIN_URL)
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
                <input type="checkbox" name="isAdmin" onChange={handleOnAdminChange}/>
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