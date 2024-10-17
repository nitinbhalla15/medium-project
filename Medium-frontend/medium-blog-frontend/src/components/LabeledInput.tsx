

type LabeledInputProps={
    label:string,
    placeholder:string,
    onChangeInp: (e:any)=>void,
    type?:string

}

export default function LabeledInput({label,placeholder,onChangeInp,type}:LabeledInputProps) {
    return <div className="mt-8">
        <label className="text-left">{label}</label>
        <input className="border border-2 border-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder={`${placeholder}`} onChange={onChangeInp} type={`${type}`} />
    </div>
}