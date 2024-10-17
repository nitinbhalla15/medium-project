type QuoteProps = {
    quoteDescription : string,
    quoteAuthor:string,
    authorDesignation:string
}

export default function Quote({quoteDescription,quoteAuthor,authorDesignation}:QuoteProps) {
    return <div className="bg-red-200 h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="max-w-lg text-left">
                <div className="font-bold text-3xl">
                    "{quoteDescription}"
                </div>
                <div className="text-lg font-bold mt-4">
                    ~ {quoteAuthor}
                </div>
                <div>
                    {authorDesignation}
                </div>
            </div>
        </div>
    </div>
} 