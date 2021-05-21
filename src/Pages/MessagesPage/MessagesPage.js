import React from "react";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import ChattedPeople from "../../components/ChattedPeople/ChattedPeople";
import ChatBox from "../../components/ChatBox/ChatBox";

import classes from "./MessagesPage.module.css";

const MessagesPage = (props) => {
  const userName = props.match?.params?.username;

  return (
    <Layout>
      <HomeLayout isRightBar={false}>
        <div className={classes.MainBox}>
          <div className={classes.ChattedPeopleBoxContainer}>
            <ChattedPeople />
          </div>
          <div className={classes.ChatBoxContainer}>
            <ChatBox userName={userName} />
          </div>
        </div>
      </HomeLayout>
    </Layout>
  );
};

export default MessagesPage;
