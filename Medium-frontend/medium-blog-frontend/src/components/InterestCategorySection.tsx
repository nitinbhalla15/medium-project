export default function InterestCategorySection({categoryList}:{categoryList:string[]}){
    return <div className="my-4 border-b border-black">
        <div className="font-semibold text-xl ml-10">
            Pick Blogs from the interested categories below
        </div>
        <div className="flex gap-4 p-2 max-w-md ml-10">
            {categoryList.map((cat)=>{
                return <div className="my-2 text-slate-500 hover:text-black cursor-pointer">
                    {cat}
                </div>
            })}
        </div>
    </div>
}