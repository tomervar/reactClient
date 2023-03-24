import React from "react"
import "./ActionScreen.css"
import useAuth from "../../hooks/useAuth"
import axios from "axios"


const ActionScreen = () => {

    const { auth, removeAuth } = useAuth();

    const userAxios = axios.create({
        baseURL: process.env.REACT_APP_USER_BASE_URL,
        headers: { 'Authorization': 'Bearer '+ auth.access_token}
    })

    const handleLogoutClick = () => {
        removeAuth();
    }

    const handleGetMeButton = async (event) => {
        event.preventDefault();
        try{
            const response = await userAxios.get(`${process.env.REACT_APP_ME_URL}`)
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetAllUsersButton = async (event) => {
        event.preventDefault();
        try{
            const response = await userAxios.get()
            console.log(response?.data)
        } catch (err) {
            alert("You are not Authorized to Use This button")
            console.log(err)
        }
    }

    const jsxLoginForm = (
        <div className="formDiv">
            <div className="button-container">
                <input type="submit" value="Get Me" onClick={handleGetMeButton}/>
                <input type="button" value="Get All Users" onClick={handleGetAllUsersButton}/>
            </div>
        </div>
    )

    return (
        <div className="screen-container">
            <div className="screenForm">
                <div className="screenTitle">Action Screen</div>
                <br/>
                {jsxLoginForm}
                <br/>
                <br/>
                <br/>
                <a href="#" onClick={handleLogoutClick}>Click Here to Logout</a>
            </div>
        </div> 
    )
}

export default ActionScreen