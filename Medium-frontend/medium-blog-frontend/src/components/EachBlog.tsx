import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { blogDetails } from "../state-store/blog-store";

type BlogType = {
    initial: string,
    name: string,
    blogTitle: string,
    blogDescription: string,
    date: string,
    likeCount: number,
    commentCount: number
}

export default function EachBlog({ initial, name, blogDescription, blogTitle, date, likeCount, commentCount }: BlogType) {
    const navigate = useNavigate();
    const setBlogState = useSetRecoilState(blogDetails);
    return <div className="border-b border-black hover:bg-slate-100 cursor-pointer p-6" onClick={() => {
        //Redirect to standAlone blog page
        const blogAtom = {
            initial:initial,
            name:name,
            blogDescription:blogDescription,
            blogTitle:blogTitle,
            date:date,
            likeCount:likeCount,
            commentCount:commentCount
        }
        setBlogState(blogAtom);
        navigate("/publishHouse");
    }}>
        <div className="flex gap-4">
            <div className="bg-black text-white rounded-full p-2">
                {initial}
            </div>
            <div className="flex flex-col justify-center">
                {name}
            </div>
        </div>
        <div className="font-bold text-2xl my-1">
            {blogTitle}
        </div>
        <div className="text-gray-600 mb-2">
            {blogDescription.length > 100 ? blogDescription.substring(0, 50) + " ..." : blogDescription}
        </div>
        <div className="flex gap-4  font-bold">
            <div>
                Posted On : {date}
            </div>
            <div className="text-amber-600">
                Likes Count : {likeCount}
            </div>
            <div className="text-amber-700">
                Comments Count : {commentCount}
            </div>
        </div>
    </div>
}