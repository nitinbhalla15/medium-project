import { atom } from "recoil";

type BlogType = {
    blogId:string
    initial: string,
    name: string,
    blogTitle: string,
    blogDescription: string,
    date: string,
    likeCount: number,
    commentCount: number
}

interface AllBlogs {
    blogId: string,
    authorName: string,
    blogTitle: string,
    blogDescription: string,
    blogDate: string,
    blogLikeCount: number,
    blogCommentCount: number
}

export const blogDetails = atom<undefined|BlogType>({
    key:"blogDetailsAtom",
    default:undefined
})

export const allBlogs = atom<undefined|AllBlogs[]>({
    key:"allBlogsAtom",
    default:undefined
})

export const fileterdBlogsAtom = atom<undefined|AllBlogs[]>({
key:"filteredBlogAtom",
default:undefined
})

export const isDashboardAtom =atom<undefined|boolean>({
    key:"isDashboardAtom",
    default:undefined
})

export const blogIdAtom = atom<undefined|string>({
    key:"blogIdAtom",
    default:undefined
})