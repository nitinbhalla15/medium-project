import { atom, RecoilState, selector } from "recoil";

type InputAtomType = undefined | string;

type InputPayloadType = {
    firstName:string|undefined,
    lastName:string|undefined,
    email:string|undefined,
    password:string|undefined
}

export const FirstNameAtom= atom<InputAtomType>({
    key:"FirstNameAtom",
    default:undefined
})

export const LastNameAtom= atom<InputAtomType>({
    key:"LastNameAtom",
    default:undefined
})

export const EmailIdAtom= atom<InputAtomType>({
    key:"EmaiIdAtom",
    default:undefined
})

export const PasswordAtom= atom<InputAtomType>({
    key:"PasswordAtom",
    default:undefined
})

export const InputPayload = selector<InputPayloadType>({
    key:"InputPayload",
    get:({get})=>{
        const firstName = get(FirstNameAtom);
        const lastName = get(LastNameAtom);
        const emailId = get(EmailIdAtom);
        const password = get(PasswordAtom);
        const signInPayload = {
            firstName:firstName,
            lastName:lastName,
            email:emailId,
            password:password
        }
        return signInPayload;
    }
})