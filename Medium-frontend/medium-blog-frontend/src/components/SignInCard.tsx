import { useRecoilState } from "recoil";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import LabeledInput from "./LabeledInput";
import { EmailIdAtom, PasswordAtom } from "../state-store/auth-store";
import { useState } from "react";

export default function SignInCard() {
    const [emailId, setEmailId] = useRecoilState(EmailIdAtom);
    const [password, setPassword] = useRecoilState(PasswordAtom);
    const [isDisabled,setDisabled] = useState(true);
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
                <CustomButton buttonName="Sign In" onBtnClick={() => {
                    if(emailId!=undefined && password!=undefined && emailId.trim()!="" && password.trim()!=""){
                        setDisabled(false);
                    }
                 }} disabled={isDisabled}></CustomButton>
            </div>
        </div>
    </div>
}