import DashboardBlog from "../components/DashboardBlog";
import TopBar from "../components/TopBar";

export default function DashboardPage() {
    return <div className="">
        <TopBar></TopBar>
        {/* <InterestCategorySection categoryList={["Java","Python","JavaScript"]}></InterestCategorySection> */}
        <DashboardBlog></DashboardBlog>
    </div>
}