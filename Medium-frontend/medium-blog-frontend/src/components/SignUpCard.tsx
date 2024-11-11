import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import LabeledInput from "./LabeledInput";
import { EmailIdAtom, FirstNameAtom, InputPayload, LastNameAtom, PasswordAtom } from "../state-store/auth-store";
import { BACKEND_URL } from "../env_store";
import { alertMessage, isAlert } from "../state-store/alert-store";
import { useNavigate } from "react-router-dom";

export default function SignUpCard(){
    const [firstName,setFirstName] = useRecoilState(FirstNameAtom);
    const [lastName,setLastName] = useRecoilState(LastNameAtom);
    const [emailId, setEmailId] = useRecoilState(EmailIdAtom);
    const [password, setPassword] = useRecoilState(PasswordAtom);
    const inputPayload  = useRecoilValue(InputPayload);
    const setIsAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    const navigate = useNavigate();
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="max-w-md">
                <Heading heading={"Create an account"} subHeading={"Already Having Account ?"} toLink={"/signin"}></Heading>
                <LabeledInput label={"First Name"} placeholder={"Enter your First Name"} onChangeInp={(e)=>{
                    setFirstName(e.target.value)
                }}></LabeledInput>
                <LabeledInput label={"Last Name"} placeholder={"Enter your Last Name"} onChangeInp={(e)=>{
                    setLastName(e.target.value)
                }}></LabeledInput>
                <LabeledInput label={"Email Id"} placeholder={"Enter your Email Id"} onChangeInp={(e)=>{
                    setEmailId(e.target.value)
                }}></LabeledInput>
                <LabeledInput label={"Password"} placeholder={"Enter your Password"} onChangeInp={(e)=>{
                    setPassword(e.target.value)
                }} type={"password"}></LabeledInput>
                <CustomButton buttonName="Sign Up" onBtnClick={async()=>{
                     try{
                        const resposne = await fetch(`${BACKEND_URL}/api/v1/auth/signup`,{
                            method:"POST",
                            headers:{
                                'Content-Type':"application/json"
                            },
                            body:JSON.stringify(inputPayload)
                        })
                        const finalResponse = await resposne.json();
                        console.log("final Resposne : ",finalResponse)
                        if (finalResponse.http_status_code == 200) {
                            const logged_in_user_email = finalResponse.resposneBody.userEmail;
                            localStorage.setItem("logged_in_user_email", logged_in_user_email);
                            const jwtToken = finalResponse.resposneBody.jwtToken; 
                            localStorage.setItem("jwtToken", jwtToken);
                            localStorage.setItem("uid",finalResponse.resposneBody.userId)
                            localStorage.setItem("loggedInUserName",finalResponse.resposneBody.userName);
                            //alert on page for successfull log in 
                            setIsAlert(true);
                            setAlertMessage([finalResponse.message]);
                            setTimeout(()=>{
                                setIsAlert(undefined);
                                setAlertMessage(undefined);
                            },2000)
                            navigate("/dashboard");
                        } else {
                            //alert on page for errors fetched from backend
                            setIsAlert(false);
                            setAlertMessage([finalResponse.message]);
                            setTimeout(()=>{
                                setIsAlert(undefined);
                                setAlertMessage(undefined);
                            },2000)
                        }
                    }catch(error){
                        console.log("error while fetching...")
                        setIsAlert(false);
                        setAlertMessage(["Service is down , please try again after sometime"]);
                        setTimeout(()=>{
                            setIsAlert(undefined);
                            setAlertMessage(undefined);
                        },2000)
                    }
                }} disabled={(emailId==undefined || password==undefined || 
                   firstName==undefined || lastName==undefined || emailId.trim()=="" ||
                   password.trim()=="" || firstName.trim()=="" || lastName.trim()=="")?true:false}></CustomButton>
            </div>
        </div>
    </div>
}