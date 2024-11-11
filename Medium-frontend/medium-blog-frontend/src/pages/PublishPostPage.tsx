import { useState } from "react";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../env_store";
import { useSetRecoilState } from "recoil";
import { alertMessage, isAlert } from "../state-store/alert-store";

export default function PublishPost() {
    const [postTitle, setPostTitle] = useState<string | undefined>(undefined);
    const [postDescription, setPostDescription] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    return <div>
        <TopBar></TopBar>
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
                    <div className="bg-black cursor-pointer text-white p-4 text-center rounded-md w-full" onClick={() => {
                        navigate("/dashboard")
                    }}>
                        Cancel
                    </div>
                    <div className={`${((postTitle != undefined && postDescription != undefined && postTitle.trim() != "" && postDescription.trim() != "") ? 'bg-black cursor-pointer' : 'bg-red-600 cursor-not-allowed')} text-white p-4 text-center rounded-md w-full`} onClick={() => {
                        const postBlogPayload = { blogTitle: postTitle, blogDescription: postDescription};
                        const loggedUser = localStorage.getItem("logged_in_user_email");
                        fetch(`${BACKEND_URL}/api/v1/blogServer/postBlog?uid=${loggedUser}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                            },
                            body: JSON.stringify(postBlogPayload)
                        }).then(async (response) => {
                            const resp = await response.json();
                            const responseMessage = resp.message;
                            if (resp.http_status_code == 200) {
                                setAlert(true);
                                setAlertMessage([`${responseMessage} , Redirecting to dashboard ...`]);
                                setTimeout(() => {
                                    setAlert(undefined);
                                    setAlertMessage(undefined);
                                    navigate("/dashboard");
                                }, 2000)

                            } else {
                                setAlert(false);
                                setAlertMessage([`${responseMessage} , Redirecting to dashboard ...`]);

                                setTimeout(() => {
                                    setAlert(undefined);
                                    setAlertMessage(undefined);
                                    navigate("/dashboard");
                                }, 2000)

                            }
                        })
                    }}>Publish Post</div>
                </div>
            </div>
        </div>
    </div>
}