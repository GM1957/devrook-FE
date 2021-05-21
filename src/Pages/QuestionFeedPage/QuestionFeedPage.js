import React from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import MiddleFeedLayout from "../../hoc/MiddleFeedLayout/MiddleFeedLayout";
import Layout from "../../hoc/Layout";
import QuestionsFeed from "../../components/Feeds/QuestionsFeed/QuestionsFeed";

const QuestionFeedPage = (props) => {
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <MiddleFeedLayout>
          <QuestionsFeed />
        </MiddleFeedLayout>
      </HomeLayout>
    </Layout>
  );
};

export default QuestionFeedPage;
