export default function TopBar({username}:{username:string}) {
    return <div className="flex justify-between border-b p-4">
        <div className="flex flex-col justify-center text-4xl font-bold">
            Medium.
        </div>
        <div className="flex justify-center gap-10">
            <div className="flex flex-col justify-center p-2 rounded-md cursor-pointer hover:text-black text-slate-400">
                <div className="flex justify-center gap-2">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                    <div className="flex flex-col justify-center ">Write</div>
                </div>
            </div>
            <div className="rounded-full bg-black text-white p-2 flex flex-col justify-center cursor-pointer">
                {username}
            </div>
        </div>
    </div>
}