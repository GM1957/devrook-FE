import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import MiddleFeedlayout from "../../hoc/MiddleFeedLayout/MiddleFeedLayout";
import MainFeed from "../../components/Feeds/MainFeed/MainFeed";

const HomePage = (props) => {
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <MiddleFeedlayout>
          <MainFeed />
        </MiddleFeedlayout>
      </HomeLayout>
    </Layout>
  );
};

export default HomePage;
