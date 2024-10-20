type BlogType = {
    initial: string,
    name: string,
    blogTitle: string,
    blogDescription: string,
    date: string,
    likeCount: number,
    commentCount: number
}

export default function EachBlog({ initial, name, blogDescription, blogTitle, date, likeCount, commentCount }: BlogType) {
    return <div className="border-b border-black hover:bg-slate-100 cursor-pointer p-6 mt-2">
        <div className="flex gap-4">
            <div className="bg-black text-white rounded-full p-2">
                {initial}
            </div>
            <div className="flex flex-col justify-center">
                {name}
            </div>
        </div>
        <div className="font-bold text-2xl my-2">
            {blogTitle}
        </div>
        <div className="text-gray-600 mb-4">
            {blogDescription}
        </div>
        <div className="flex gap-4 mb-4">
            <div>
                {date}
            </div>
            <div>
                {likeCount}
            </div>
            <div>
                {commentCount}
            </div>
        </div>
    </div>
}