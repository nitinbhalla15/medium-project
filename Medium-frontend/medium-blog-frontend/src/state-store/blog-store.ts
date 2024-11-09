import { atom } from "recoil";

type BlogType = {
    initial: string,
    name: string,
    blogTitle: string,
    blogDescription: string,
    date: string,
    likeCount: number,
    commentCount: number
}

export const blogDetails = atom<undefined|BlogType>({
    key:"blogDetailsAtom",
    default:undefined
})