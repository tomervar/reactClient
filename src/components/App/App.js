import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes"
import ActoinScreen from "../ActoinScreen/ActoinScreen"

const App = () => {

    return (
        <div>
            <Routes>
                <Route element={<LoginForm />} path="/" exact/>
                <Route element={<LoginForm />} path="/Login" exact/>
                <Route element={<PrivateRoutes />}>
                    <Route element={<ActoinScreen/>} path="/ActoinScreen" />
                </Route>
                <Route element={<RegisterForm />} path="/Register" exact/>
                <Route element={<LoginForm />} path="*" />
            </Routes>
        </div>
    )
} 

export default App