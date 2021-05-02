import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import MiddleFeedlayout from "../../hoc/MiddleFeedLayout/MiddleFeedLayout";
import QuestionsFeed from "../../components/Feeds/QuestionsFeed/QuestionsFeed";

const HomePage = (props) => {
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <MiddleFeedlayout>
         <QuestionsFeed/>
        </MiddleFeedlayout>
      </HomeLayout>
    </Layout>
  );
};

export default HomePage;
