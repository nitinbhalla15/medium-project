import { useRecoilValue } from "recoil";
import { alertMessage, isAlert } from "../state-store/alert-store";

export default function AlertComponet({ children }: { children: JSX.Element }) {
    const getIsAlert = useRecoilValue(isAlert);
    return <>
        {children}
        {(getIsAlert != undefined) ? ((getIsAlert == true) ? <AlertDiv isError={false}></AlertDiv> : <AlertDiv isError={true}></AlertDiv>) : null}

    </>
}




function AlertDiv({ isError }: { isError: boolean }) {
    console.log("Alert div rendered : ", isError);
    const getAlertMessage = useRecoilValue(alertMessage);
    return <div className={`absolute text-white p-4 rounded-md ${isError ? 'bg-red-700 top-4 right-4 max-w-md' : 'bg-green-700 bottom-4 right-4'}`}>
        <div>
            {(isError) ? "Error !" : "Success"}
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