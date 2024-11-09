import { useRecoilValue } from "recoil";
import TopBar from "../components/TopBar";
import { blogDetails } from "../state-store/blog-store";

export default function PublishHouse() {
    const blog = useRecoilValue(blogDetails);
    return <div>
        <TopBar username="Nitin"></TopBar>
        <div className="flex justify-center pt-4">
            <div className="max-w-4xl bg-gray-200 p-8 flex flex-col justify-center">
                <div className="text-3xl font-bold p-2">
                    {blog?.blogTitle}
                </div>
                <div className="flex p-2 gap-2 my-8">
                    <div className="flex flex-col justify-center bg-black text-white rounded-full p-4">N</div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col justify-center">
                            {blog?.name}
                        </div>
                        <div className="flex flex-col justify-center text-sm text-slate-500">
                            {blog?.date}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between border-slate-500 border-t border-b p-2  my-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col justify-center">Likes : {blog?.likeCount}</div>
                        <div className="flex flex-col justify-center">Comments :  {blog?.commentCount}</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="font-bold flex flex-col justify-center bg-green-300 p-2 rounded-md cursor-pointer" onClick={()=>{
                            //Like post 
                        }}>Like Post</div>
                        <div className="font-bold flex flex-col justify-center bg-blue-200 p-2 rounded-md cursor-pointer" onClick={()=>{
                            //Open model from right to add comment 
                        }}>Add Comment</div>
                    </div>
                </div>
                <div className="p-2 t">
                    {blog?.blogDescription}
                </div>
            </div>
        </div>
    </div>
}