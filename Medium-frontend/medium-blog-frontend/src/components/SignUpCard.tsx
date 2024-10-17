import CustomButton from "./CustomButton";
import Heading from "./Heading";
import LabeledInput from "./LabeledInput";

export default function SignUpCard(){
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="max-w-md">
                <Heading heading={"Create an account"} subHeading={"Already Having Account ?"} toLink={"/signin"}></Heading>
                <LabeledInput label={"First Name"} placeholder={"Enter your First Name"} onChangeInp={()=>{}}></LabeledInput>
                <LabeledInput label={"Last Name"} placeholder={"Enter your Last Name"} onChangeInp={()=>{}}></LabeledInput>
                <LabeledInput label={"Email Id"} placeholder={"Enter your Email Id"} onChangeInp={()=>{}}></LabeledInput>
                <LabeledInput label={"Password"} placeholder={"Enter your Password"} onChangeInp={()=>{}} type={"password"}></LabeledInput>
                <CustomButton buttonName="Sign Up" onBtnClick={()=>{}} disabled={true}></CustomButton>
            </div>
        </div>
    </div>
}