import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import MiddleFeedLayout from "../../hoc/MiddleFeedLayout/MiddleFeedLayout";
import Layout from "../../hoc/Layout";
import BlogFeed from "../../components/Feeds/BlogsFeed/BlogsFeed";
import classes from "./BlogFeedPage.module.css";

const BlogFeedPage = (props) => {
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <MiddleFeedLayout>
          <BlogFeed />
        </MiddleFeedLayout>
      </HomeLayout>
    </Layout>
  );
};

export default BlogFeedPage;
