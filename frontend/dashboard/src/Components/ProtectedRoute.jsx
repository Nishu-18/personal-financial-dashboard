import { Navigate, Route, useNavigate } from "react-router-dom";

export function ProtectedRoute({children}) {
    const isAuthenticated = localStorage.getItem("token") !=null;
    const navigate=useNavigate()
    if(!isAuthenticated){
        return <Navigate to={'/signin'}></Navigate>
    }
    return children
}
