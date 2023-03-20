// import axios from "../../api/axios";
// const axios = require("../../api/axios")
// const axios = require("axios")
// import axios from 'axios';
// axios.create({
//     baseURL: 'http://localhost:3500'
// });
const baseURL = "http://localhost:3500";
const REGISTER_URL = "/register";

function registerOk(username, password, isAdmin){
    console.log(username, password, isAdmin)
    
    return register(username, password, isAdmin)
}

function isPasswordValid(password, confirmPassword){
    return password === confirmPassword
}

async function register(username, password, isAdmin){
    try {
        console.log("here")
        // const response = await axios.post(`${baseURL}/${REGISTER_URL}`,
        //     JSON.stringify({username, password, isAdmin}),
        //     {
        //         headers: {'Content-Type': 'application/json'},
        //         withCredentials: true
        //     }
        // )
        // console.log(response.data)
        // console.log(response.accessToken)
        return true
    } catch (err) {
        console.log(err.message)
        return false
    }
}

exports.registerOk = registerOk;
exports.isPasswordValid = isPasswordValid;
