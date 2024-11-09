import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { EmailIdAtom, InputPayload, PasswordAtom } from "../state-store/auth-store";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import LabeledInput from "./LabeledInput";
import { BACKEND_URL } from "../../src/env_store";
import { useNavigate } from "react-router-dom";
import { alertMessage, isAlert } from "../state-store/alert-store";

export default function SignInCard() {
    const [emailId, setEmailId] = useRecoilState(EmailIdAtom);
    const [password, setPassword] = useRecoilState(PasswordAtom);
    const inputPayload = useRecoilValue(InputPayload);
    const setIsAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    const navigate = useNavigate();
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="max-w-md">
                <Heading heading={"Login to your account"} subHeading={"Haven't registered yet ?"} toLink={"/signup"}></Heading>
                <LabeledInput label={"Email Id"} placeholder={"Enter your Email Id"} onChangeInp={(e) => {
                    setEmailId(e.target.value);
                }}></LabeledInput>
                <LabeledInput label={"Password"} placeholder={"Enter your Password"} onChangeInp={(e) => {
                    setPassword(e.target.value)
                }} type={"password"}></LabeledInput>
                <CustomButton buttonName="Sign In" onBtnClick={async () => {
                    //fetch  call to backend 
                    // if succceed then redirect to dashboard
                    // else alert in main window
                    try {
                        const reqBody = {
                            username: inputPayload.email,
                            password: inputPayload.password
                        }
                        const resposne = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
                            method: "POST",
                            // credentials:"include", --> to send cookies
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify(reqBody)
                        })
                        const finalResponse = await resposne.json();
                        console.log("Response post sign in : ", finalResponse)
                        //set the user details post fetching it from backend 
                        if (finalResponse.http_status_code == 200) {
                            const logged_in_user_email = finalResponse.resposneBody.userEmail;
                            localStorage.setItem("logged_in_user_email", logged_in_user_email);
                            const jwtToken = finalResponse.resposneBody.jwtToken; 
                            localStorage.setItem("jwtToken", jwtToken);
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
                    } catch (error) {
                        //alert on page for not sending request to backend -> service not available
                        console.log("error while fetching...")
                        setIsAlert(false);
                        setAlertMessage(["Service is down , please try again after sometime"]);
                        setTimeout(()=>{
                            setIsAlert(undefined);
                            setAlertMessage(undefined);
                        },2000)
                    }
                }} disabled={(emailId == undefined || password == undefined || emailId.trim() == "" || password.trim() == "") ? true : false}></CustomButton>
            </div>
        </div>
    </div>
}