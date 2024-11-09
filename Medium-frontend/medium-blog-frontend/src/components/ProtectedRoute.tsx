import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const jwtToken = localStorage.getItem("jwtToken");
    return (jwtToken!=undefined || jwtToken!=null) ? <Outlet></Outlet> : <Navigate to={"/signin"}></Navigate> 
}