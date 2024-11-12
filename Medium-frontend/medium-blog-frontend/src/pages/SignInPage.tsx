import { useEffect } from "react";
import Quote from "../components/Quote";
import SignInCard from "../components/SignInCard";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const navigate = useNavigate();
    useEffect(()=>{
        {(localStorage.getItem("jwtToken")!=undefined&&localStorage.getItem("jwtToken")!=null)?navigate("/dashboard"):null};
    },[])
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
           <SignInCard></SignInCard>     
        </div>
        <div className="hidden lg:block">
            <Quote quoteDescription={"Books are a uniquely portable magic.”"} quoteAuthor={"Stephen King"} authorDesignation={"American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels"}></Quote>
        </div>
    </div>
}