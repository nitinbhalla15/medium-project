import { useEffect, useState } from "react";
import EachBlog from "./EachBlog";
import { BACKEND_URL } from "../env_store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alertMessage, isAlert } from "../state-store/alert-store";
import { allBlogs, fileterdBlogsAtom, isDashboardAtom } from "../state-store/blog-store";


export default function DashboardBlog() {
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    const [allBlogsBackend,setAllBlogs] = useRecoilState(allBlogs);
    const setIsDashboard = useSetRecoilState(isDashboardAtom);
    const allFilteredBlogs = useRecoilValue(fileterdBlogsAtom);
    useEffect(() => {
        setIsDashboard(true);
        console.log("Dashboard Mounted to page")
        fetch(`${BACKEND_URL}/api/v1/blogServer/fetchAllBlogs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then(async (response) => {
            const finalResponse = await response.json();
            if (finalResponse.http_status_code == 200) {
                setAlert(true);
                setAlertMessage([`${finalResponse.message}`]);
                const allBlogs = finalResponse.resposneBody.responseBody;
                console.log("All blogs : ", allBlogs);
                //update blogs state
                setAllBlogs(allBlogs);
                setTimeout(() => {
                    setAlert(undefined);
                    setAlertMessage(undefined);
                }, 2000)
            } else {
                setAlert(false);
                setAlertMessage(["Failed to fetch Blogs , please try again after sometime"]);
                setTimeout(() => {
                    setAlert(undefined);
                    setAlertMessage(undefined);
                }, 2000)
            }
        })
        return () => {
            console.log("Dashboard unmounter to page")
        }
    }, [])
    return <div className="p-4">
        <div className="flex justify-center">
            <div className="max-w-4xl p-2  flex flex-col justify-center overflow-y-auto">
                {allFilteredBlogs!=undefined && allFilteredBlogs.length>0 && allFilteredBlogs.map((blg) => {
                    const authorNameArr = blg.authorName.split(' ');
                    const authorInitial = authorNameArr[0][0] + authorNameArr[1][0]
                    return <EachBlog key={blg.blogId} blogId={blg.blogId} initial={authorInitial} name={blg.authorName} blogTitle={blg.blogTitle} blogDescription={blg.blogDescription} date={blg.blogDate} likeCount={blg.blogLikeCount} commentCount={blg.blogCommentCount}></EachBlog>
                })}
                {allFilteredBlogs==undefined && allBlogsBackend!=undefined && allBlogsBackend.length > 0 && allBlogsBackend.map((blg) => {
                    const authorNameArr = blg.authorName.split(' ');
                    const authorInitial = authorNameArr[0][0] + authorNameArr[1][0]
                    return <EachBlog key={blg.blogId} blogId={blg.blogId} initial={authorInitial} name={blg.authorName} blogTitle={blg.blogTitle} blogDescription={blg.blogDescription} date={blg.blogDate} likeCount={blg.blogLikeCount} commentCount={blg.blogCommentCount}></EachBlog>
                })}
            </div>
        </div>
    </div>
}