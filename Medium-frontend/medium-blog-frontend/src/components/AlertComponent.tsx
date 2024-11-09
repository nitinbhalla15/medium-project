import { useRecoilValue, useSetRecoilState } from "recoil";
import { alertMessage, isAlert } from "../state-store/alert-store";

export default function AlertComponet({ children }: { children: JSX.Element }) {
    const getIsAlert = useRecoilValue(isAlert);
    return <>
        {children}
        {(getIsAlert != undefined) ? ((getIsAlert == true) ? <AlertDiv isError={false}></AlertDiv> : <AlertDiv isError={true}></AlertDiv>) : null}

    </>
}




function AlertDiv({ isError }: { isError: boolean }) {
    // console.log("Alert div rendered : ", isError);
    const getAlertMessage = useRecoilValue(alertMessage);
    const setAlert = useSetRecoilState(isAlert);
    const setAlertMessage = useSetRecoilState(alertMessage);
    return <div className={`absolute text-white p-4 rounded-md ${isError ? 'bg-red-700 top-4 right-4 max-w-md' : 'bg-green-700 bottom-4 right-4'}`}>
        <div className="flex justify-between">
            <div className="flex flex-col justify-center">{(isError) ? "Error !" : "Success"}</div>
            <div className="flex flex-col justify-center cursor-pointer" onClick={() => {
                setAlert(undefined);
                setAlertMessage(undefined);
            }}>x</div>
        </div>
        <div className="my-2">
            {getAlertMessage != undefined && getAlertMessage.map((item: string) => {
                return <div>
                    {item}
                </div>
            })}
        </div>
    </div>
}