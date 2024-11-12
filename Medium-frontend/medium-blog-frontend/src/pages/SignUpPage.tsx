import { useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import SignUpCard from "../components/SignUpCard";
import { useEffect } from "react";

export default function SignUp() {
    const navigate = useNavigate();
    useEffect(()=>{
        {(localStorage.getItem("jwtToken")!=undefined&&localStorage.getItem("jwtToken")!=null)?navigate("/dashboard"):null};
    },[])
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
           <SignUpCard></SignUpCard>     
        </div>
        <div className="hidden lg:block">
            <Quote quoteDescription={"The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”"} quoteAuthor={"Dr. Seuss"} authorDesignation={"American children’s author, political cartoonist, illustrator, poet, animator, and filmmaker"}></Quote>
        </div>
    </div>
}