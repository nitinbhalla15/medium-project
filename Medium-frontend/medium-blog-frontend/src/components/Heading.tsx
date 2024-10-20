import { Link } from "react-router-dom"
import { EmailIdAtom, FirstNameAtom, LastNameAtom, PasswordAtom } from "../state-store/auth-store";
import {useSetRecoilState } from "recoil";

type HeadingProps = {
    heading: string,
    subHeading: string,
    toLink: string
}

export default function Heading({ heading, subHeading, toLink }: HeadingProps) {
    const setFirstName = useSetRecoilState(FirstNameAtom);
    const setLastName = useSetRecoilState(LastNameAtom);
    const setEmailId = useSetRecoilState(EmailIdAtom);
    const setPassword = useSetRecoilState(PasswordAtom);
    return <div>
        <div className="font-bold text-4xl text-center">
            {heading}
        </div>
        <div className="text-center mt-2">
            {subHeading}
            <Link onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
            }} className="mx-2 text-slate-400 underline" to={`${toLink}`}>{(toLink == "/signup") ? `SignUp` : `SignIn`}</Link>
        </div>
    </div>
}