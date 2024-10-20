import { useNavigate } from "react-router-dom";

type childType = {
    children : JSX.Element
}

export default function ProtectedRoute({children}:childType){
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    if(jwtToken==undefined || jwtToken==null){
        navigate("/signin");
        return;
    }
    return <div>
        {children}
    </div>
}