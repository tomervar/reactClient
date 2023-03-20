import { useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import "./RegisterForm.css"
import axios from "axios";
const registerForm_utils = require("./RegisterForm_utils")
const errorMassageList = require("../../assets/errorMassageList")


const baseURL = "http://localhost:3500";
const REGISTER_URL = "/register";


const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const Navigate = useNavigate()
    const LoginPath = "/Login"

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
        // ask the server if userName and password are valid
        var isPasswordValid = registerForm_utils.isPasswordValid(passwordInput.value, confirmPasswordInput.value)
        var valid = false
        if(isPasswordValid) {
            // const RegisterOk = await registerForm_utils.registerOk(userNameInput.value, passwordInput.value, isAdmin)
            try {
                console.log("here")
                const response = await axios.post(`${baseURL}${REGISTER_URL}`,
                    JSON.stringify({ userNameValue, passwordValue, isAdmin }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Access-Control-Allow-Origin': 'http://localhost:3500',
                            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
                            // "Access-Control-Allow-Headers": "*"
                        },
                        withCredentials: true
                    
                    }
                )
                console.log(response.data)
                console.log(response.accessToken)
                valid = true
            } catch (err) {
                console.log(err.message)
                valid = false
            }

            if(valid){
                setIsSubmit(true)
                setTimeout(() => {
                    Navigate(LoginPath)
                  }, 2000);
            }
            else{
                setErrorMessage({ name: "RegisterUserNameInvalid" , message: errorMassageList.errors.RegisterUserNameInvalid})
            }
        }   
        else{
            setErrorMessage({ name: "RegisterPassword" , message: errorMassageList.errors.RegisterPassword})
        }


/*     old version
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
        }*/


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