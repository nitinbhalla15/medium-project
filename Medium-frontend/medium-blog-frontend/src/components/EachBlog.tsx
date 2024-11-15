import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { blogDetails, blogIdAtom, isDashboardAtom } from "../state-store/blog-store";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";

type BlogType = {
    blogId:string,
    initial: string,
    name: string,
    blogTitle: string,
    blogDescription: string,
    date: string,
    likeCount: number,
    commentCount: number
}

export default function EachBlog({blogId, initial, name, blogDescription, blogTitle, date, likeCount, commentCount }: BlogType) {
    const navigate = useNavigate();
    const setIsDashboard = useSetRecoilState(isDashboardAtom);
    return <div className="border-b border-black hover:bg-slate-100 cursor-pointer p-6" onClick={() => {
        //Redirect to standAlone blog page'
        setIsDashboard(false)
        localStorage.setItem("selectedBlogId",blogId);
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

                Posted On : {`${new Date(date).toDateString()}`}
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