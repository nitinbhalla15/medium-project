import { useRecoilValue, useSetRecoilState } from "recoil";
import TopBar from "../components/TopBar";
import { blogDetails } from "../state-store/blog-store";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../env_store";
import { alertMessage, isAlert } from "../state-store/alert-store";

export default function PublishHouse() {
    const blog = useRecoilValue(blogDetails);
    const [likeCount, setLikeCount] = useState(blog?.likeCount);
    const [commentCount, setCommentCount] = useState(blog?.commentCount);
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    const [isCommentAllowed, setCommentAllowed] = useState(false);
    const [comment, setComment] = useState<undefined | string>();
    return <div>
        <TopBar></TopBar>
        <div className="flex justify-center pt-4">
            <div className="w-1/2 bg-gray-200 p-8 flex flex-col justify-center">
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
                        <div className="flex flex-col justify-center bg-green-300 p-2 rounded-md font-bold cursor-pointer">Likes : {likeCount}</div>
                        <div className="flex flex-col justify-center bg-blue-200 p-2 rounded-md font-bold cursor-pointer">Comments :  {commentCount}</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="font-bold flex flex-col justify-center bg-green-300 p-2 rounded-md cursor-pointer" onClick={() => {
                            //Like post 
                            fetch(`${BACKEND_URL}/api/v1/blogServer/likePost?uid=${localStorage.getItem("uid")}&pid=${blog?.blogId}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                                }
                            }).then(async (response) => {
                                const finalResponse = await response.json();
                                if (finalResponse.http_status_code == 200) {
                                    setAlert(true);
                                    setAlertMessage([`${finalResponse.message}`]);
                                    setTimeout(() => {
                                        setAlert(undefined);
                                        setAlertMessage(undefined);
                                    }, 2000)
                                    setLikeCount(() => {
                                        if (likeCount != undefined) {
                                            const newLikeCount = likeCount + 1;
                                            return newLikeCount;
                                        }
                                    })

                                } else {
                                    setAlert(false);
                                    setAlertMessage([`${finalResponse.responseBody.message}`]);
                                    setTimeout(() => {
                                        setAlert(undefined);
                                        setAlertMessage(undefined);
                                    }, 2000)
                                }
                            })

                        }}>Like Post</div>
                        <div className="font-bold flex flex-col justify-center bg-blue-200 p-2 rounded-md cursor-pointer" onClick={() => {
                            //Open model from right to add comment 
                            setCommentAllowed(true);
                        }}>Add Comment</div>
                    </div>
                </div>
                {isCommentAllowed && <div>
                    <div>
                        <input onChange={(e) => {
                            setComment(e.target.value);
                        }} className="w-full p-2 border-black border-2" placeholder="Add Comment.."></input>
                    </div>
                    <div className="flex justify-between mt-2 ">
                        <div className="bg-red-600 p-2 rounded-md cursor-pointer font-bold" onClick={() => {
                            setCommentAllowed(false);
                        }}>
                            Cancel
                        </div>
                        <div className="bg-green-600 p-2 rounded-md cursor-pointer font-bold" onClick={() => {
                            if (comment != undefined && comment != null && comment.trim() != "") {
                                const payload = {
                                    postId: blog?.blogId,
                                    userId: localStorage.getItem("uid"),
                                    comment: comment
                                }
                                fetch(`${BACKEND_URL}/api/v1/blogServer/commentPost`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                                    },
                                    body: JSON.stringify(payload)
                                }).then(async (response) => {
                                    const finalResposne = await response.json();
                                    if (finalResposne.http_status_code == 200) {
                                        setAlert(true);
                                        setAlertMessage([`${finalResposne.message}`]);
                                        setTimeout(() => {
                                            setAlert(undefined);
                                            setAlertMessage(undefined);
                                        }, 2000);
                                        setCommentCount(() => {
                                            if (commentCount != undefined) {
                                                const newCommentCount = commentCount + 1;
                                                return newCommentCount;
                                            }
                                        })
                                        setCommentAllowed(false);
                                        setComment(undefined);
                                    } else {
                                        setAlert(false);
                                        setAlertMessage([`${finalResposne.message}`]);
                                        setTimeout(() => {
                                            setAlert(undefined);
                                            setAlertMessage(undefined);
                                        }, 2000);
                                    }
                                })
                            } else {
                                setAlert(false);
                                setAlertMessage(["Comment should not be blank"]);
                                setTimeout(() => {
                                    setAlert(undefined);
                                    setAlertMessage(undefined);
                                }, 2000);
                            }
                        }}>
                            Post Comment
                        </div>
                    </div>

                </div>}
                <div className="p-2 t">
                    {blog?.blogDescription}
                </div>
            </div>
        </div>
        {(commentCount != undefined && commentCount > 0) && <AllComments postId={blog?.blogId}></AllComments>}
    </div>
}

interface CommentType {
    userName: string,
    commentDescription: string,
    commentDate: string
}



function AllComments({ postId }: { postId: undefined | string }) {
    const [allComments, setAllComments] = useState<CommentType[]>();
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/blogServer/fetchPostComments?pid=${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(async (response) => {
            const finalResponse = await response.json();
            if (finalResponse.http_status_code == 200) {
                const allBlogComments = finalResponse.resposneBody.responseBody;
                setAllComments(allBlogComments);
                console.log("all comments : ", allComments)
                setAlert(true);
                setAlertMessage([`${finalResponse.message}`]);
                setTimeout(() => {
                    setAlert(undefined);
                    setAlertMessage(undefined);
                }, 2000);
            } else {
                setAlert(false);
                setAlertMessage([`${finalResponse.message}`]);
                setTimeout(() => {
                    setAlert(undefined);
                    setAlertMessage(undefined);
                }, 2000);
            }
        })
    }, [])
    return <div className="flex justify-center mt-10">
        <div className="w-1/2 bg-slate-200 p-8 max-h-96 overflow-y-auto">
            <div className="flex flex-col">
                <div className="font-bold">All Comments</div>
                {allComments!=undefined && allComments.length > 0 && allComments.map((item) => {
                    return <div>
                        <EachComment userName={item.userName} commentDescription={item.commentDescription} commentDate={item.commentDate}  ></EachComment>
                    </div>
                })}
            </div>
        </div>
    </div>
}

function EachComment({userName, commentDescription, commentDate }: CommentType) {
    return <div className="flex flex-col p-2 gap-2 bg-black text-white mt-2 rounded-2xl">
        <div className="flex gap-2">
            {/* <div className="flex flex-col justify-center bg-black text-white rounded-full p-4">{authorName[0]}</div> */}
            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center">
                    <div>
                    @ {userName} : {commentDescription}
                    </div>
                </div>
                <div className="flex flex-col justify-center text-sm text-slate-500">
                    {commentDate}
                </div>
            </div>
        </div>
       
    </div>

}