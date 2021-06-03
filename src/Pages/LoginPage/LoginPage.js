import React, { useState } from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import LoginModal from "../../components/Login/LoginModal/LoginModal";
import classes from "./LoginPage.module.css";

const LoginPage = (props) => {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div className={classes.LoginModal}>
          <LoginModal open={open} closed={closeHandler} />
        </div>
      </HomeLayout>
    </Layout>
  );
};

export default LoginPage;
