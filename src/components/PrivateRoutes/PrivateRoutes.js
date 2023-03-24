import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const PrivateRoutes = () => {
    const { auth } = useAuth();
    return(
        auth.access_token ? <Outlet/> : <Navigate to={`${process.env.REACT_APP_LOGIN_URL}`} />
    )
}

export default PrivateRoutes