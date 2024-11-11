import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../env_store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alertMessage, isAlert } from "../state-store/alert-store";
import { allBlogs, fileterdBlogsAtom, isDashboardAtom } from "../state-store/blog-store";
import { EmailIdAtom, FirstNameAtom, LastNameAtom, PasswordAtom } from "../state-store/auth-store";

export default function TopBar() {
    const navigate = useNavigate();
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    const setAllBlogs = useSetRecoilState(allBlogs);
    const isDashboard = useRecoilValue(isDashboardAtom);
    const setFirstName = useSetRecoilState(FirstNameAtom);
    const setLastName = useSetRecoilState(LastNameAtom);
    const setEmailId = useSetRecoilState(EmailIdAtom);
    const setPassword = useSetRecoilState(PasswordAtom);
    const setFilteredBlogs = useSetRecoilState(fileterdBlogsAtom);
    let clock: any;
    return <div className="w-full flex justify-between border-b p-4 gap-2">
        <div className="flex flex-col justify-center text-4xl font-bold cursor-pointer" onClick={() => {
            navigate("/dashboard")
        }}>
            Medium.
        </div>
        {(isDashboard != undefined && isDashboard == true) && <div className="flex flex-col justify-center w-full">
            <input className="p-4 border-2 rounded-xl" placeholder="Search blogs.." onChange={(event) => {
                clearTimeout(clock);
                clock = setTimeout(() => {
                    if (event.target.value != undefined && event.target.value.trim() != "") {
                        try {
                            fetch(`${BACKEND_URL}/api/v1/blogServer/searchBlog?value=${event.target.value}`, {
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
                                    setFilteredBlogs(allBlogs)
                                    //update blogs state
                                    // setAllBlogs(allBlogs);
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
                        } catch (error) {
                            setAlert(false);
                            setAlertMessage([`${error}`]);
                            setTimeout(() => {
                                setAlert(undefined);
                                setAlertMessage(undefined);
                            }, 2000)
                        }
                    }else{
                        setFilteredBlogs(undefined)
                    }
                }, 300);
            }}></input>
        </div>}
        <div className="flex justify-center gap-10">
            <div className="flex flex-col justify-center p-2 rounded-md cursor-pointer hover:text-black text-slate-400" onClick={() => {
                navigate("/publishPost")
            }}>
                <div className="flex justify-center gap-2">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                    <div className="flex flex-col justify-center ">Write</div>
                </div>
            </div>
            <div className="rounded-full bg-black text-white p-2 flex flex-col justify-center cursor-pointer" onClick={() => {
                localStorage.clear();
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                navigate("/signin")
            }}>
                Logout
            </div>
        </div>
    </div>


}