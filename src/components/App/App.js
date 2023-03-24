import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes"
import ActionScreen from "../ActionScreen/ActionScreen"

const App = () => {

    return (
        <div>
            <Routes>
                <Route element={<LoginForm />} path="/" exact/>
                <Route element={<LoginForm />} path={`${process.env.REACT_APP_LOGIN_URL}`} exact/>
                <Route element={<PrivateRoutes />}>
                    <Route element={<ActionScreen/>} path={`${process.env.REACT_APP_ACTION_SCREEN}`} />
                </Route>
                <Route element={<RegisterForm />} path={`${process.env.REACT_APP_REGISTER_URL}`} exact/>
                <Route element={<LoginForm />} path="*" />
            </Routes>
        </div>
    )
} 

export default App