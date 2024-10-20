import EachBlog from "./EachBlog";

export default function DashboardBlog() {
    const blogs = [{
        initial: "Nitin",
        name: "Nitin Bhalla",
        blogTitle: "Spring doesn’t recommend @Autowired anymore???",
        blogDescription: "In Spring, dependency injection is a fundamental concept used to manage the lifecycle and dependencies of beans. @Autowired is a common way to inject dependencies into Spring-managed components ...",
        date: "Jul 19,1014",
        likeCount: 79,
        commentCount: 2
    },{
        initial: "Nitin",
        name: "Nitin Bhalla",
        blogTitle: "Spring doesn’t recommend @Autowired anymore???",
        blogDescription: "In Spring, dependency injection is a fundamental concept used to manage the lifecycle and dependencies of beans. @Autowired is a common way to inject dependencies into Spring-managed components ...",
        date: "Jul 19,1014",
        likeCount: 79,
        commentCount: 2
    },{
        initial: "Nitin",
        name: "Nitin Bhalla",
        blogTitle: "Spring doesn’t recommend @Autowired anymore???",
        blogDescription: "In Spring, dependency injection is a fundamental concept used to manage the lifecycle and dependencies of beans. @Autowired is a common way to inject dependencies into Spring-managed components ...",
        date: "Jul 19,1014",
        likeCount: 79,
        commentCount: 2
    },{
        initial: "Nitin",
        name: "Nitin Bhalla",
        blogTitle: "Spring doesn’t recommend @Autowired anymore???",
        blogDescription: "In Spring, dependency injection is a fundamental concept used to manage the lifecycle and dependencies of beans. @Autowired is a common way to inject dependencies into Spring-managed components ...",
        date: "Jul 19,1014",
        likeCount: 79,
        commentCount: 2
    },{
        initial: "Nitin",
        name: "Nitin Bhalla",
        blogTitle: "Spring doesn’t recommend @Autowired anymore???",
        blogDescription: "In Spring, dependency injection is a fundamental concept used to manage the lifecycle and dependencies of beans. @Autowired is a common way to inject dependencies into Spring-managed components ...",
        date: "Jul 19,1014",
        likeCount: 79,
        commentCount: 2
    }]
    return <div className="grid grid-cols-4 p-4">
        <div className="lg:col-span-3 col-span-4 max-w-4xl p-2">
            {blogs.map((blg) => {
                return <EachBlog initial={blg.initial} name={blg.name} blogTitle={blg.blogTitle} blogDescription={blg.blogDescription} date={blg.date} likeCount={blg.likeCount} commentCount={blg.commentCount}></EachBlog>
            })}
        </div>
        <div className="bg-blue-300 lg:col-span-1 hidden lg:block p-2">
            bye
        </div>
    </div>
}