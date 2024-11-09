import { atom } from "recoil";

export const isAlert = atom<undefined|boolean>({
    key:"isAlert",
    default:undefined
})

export const alertMessage = atom<undefined| string[]>({
    key:"alertMessage",
    default:undefined
})