import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import MiddleFeedLayout from "../../hoc/MiddleFeedLayout/MiddleFeedLayout";
import Layout from "../../hoc/Layout";
import DevFeed from "../../components/Feeds/DevFeed/DevFeed";

const DevFeedPage = (props) => {
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <MiddleFeedLayout>
          <DevFeed />
        </MiddleFeedLayout>
      </HomeLayout>
    </Layout>
  );
};

export default DevFeedPage;
