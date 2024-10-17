import { Link } from "react-router-dom"

type HeadingProps={
    heading:string,
    subHeading:string,
    toLink:string
}

export default function Heading({heading,subHeading,toLink}:HeadingProps) {
    return <div>
        <div className="font-bold text-4xl text-center">
            {heading}
        </div>
        <div className="text-center mt-2">
            {subHeading}
            <Link className="mx-2 text-slate-400 underline" to={`${toLink}`}>{(toLink=="/signup")?`SignUp`:`SignIn`}</Link>
        </div>
    </div>
}