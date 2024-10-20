import { useState } from "react";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

export default function PublishPost() {
    const [postTitle, setPostTitle] = useState<string | undefined>(undefined);
    const [postDescription, setPostDescription] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    return <div>
        <TopBar username={"Nitin"}></TopBar>
        <div className="p-4 flex justify-center my-12">
            <div className="flex flex-col max-w-2xl">
                <input onChange={(e) => {
                    setPostTitle(e.target.value);
                    console.log(postDescription);
                }} className="p-4 border-l-4  text-6xl" placeholder="Title"></input>
                <input onChange={(e) => {
                    setPostDescription(e.target.value);
                    console.log(postTitle);
                }} className="p-4 text-2xl border-l-4 my-10" placeholder="Tell your story ..."></input>
                <div className="flex gap-2">
                    <div className="bg-black cursor-pointer text-white p-4 text-center rounded-md w-full" onClick={()=>{
                        navigate("/dashboard")
                    }}>
                        Cancel
                    </div>
                    <div className={`${((postTitle != undefined && postDescription != undefined && postTitle.trim() != "" && postDescription.trim() != "") ? 'bg-black cursor-pointer' : 'bg-red-600 cursor-not-allowed')} text-white p-4 text-center rounded-md w-full`} onClick={() => {
                        const postBlogPayload = { title: postTitle, description: postDescription };
                        //backend call to save the post
                    }}>Publish Post</div>
                </div>
            </div>
        </div>
    </div>
}