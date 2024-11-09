import DashboardBlog from "../components/DashboardBlog";
import InterestCategorySection from "../components/InterestCategorySection";
import TopBar from "../components/TopBar";

export default function DashboardPage() {
    return <div className="">
        <TopBar username={"Nitin"}></TopBar>
        {/* <InterestCategorySection categoryList={["Java","Python","JavaScript"]}></InterestCategorySection> */}
        <DashboardBlog></DashboardBlog>
    </div>
}