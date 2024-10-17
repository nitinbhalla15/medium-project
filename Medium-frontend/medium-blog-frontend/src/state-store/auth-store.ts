import { atom, RecoilState } from "recoil";

export const FirstNameAtom:RecoilState<string> = atom({
    key:"FirstNameAtom",
    default:""
})

export const LastNameAtom:RecoilState<string> = atom({
    key:"LastNameAtom",
    default:""
})

export const EmailIdAtom :RecoilState<string> = atom({
    key:"EmaiIdAtom",
    default:""
})

export const PasswordAtom: RecoilState<string> = atom({
    key:"PasswordAtom",
    default:""
})