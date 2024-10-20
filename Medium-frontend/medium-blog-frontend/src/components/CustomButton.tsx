type CustomButtomProps={
    buttonName:string,
    onBtnClick:()=>void;
    disabled?:boolean
}
export default function CustomButton({buttonName,onBtnClick,disabled}:CustomButtomProps){
    return <div className={`text-center text-white mt-8 p-2 rounded-md ${disabled?`cursor-not-allowed bg-red-700`:`cursor-pointer bg-black `}`} onClick={(disabled)?()=>{}:onBtnClick}>
        <button disabled={disabled} className={`${disabled?`cursor-not-allowed`:`cursor-pointer`}`}>{buttonName}</button>
    </div>

}