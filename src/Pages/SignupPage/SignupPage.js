import React, { useState } from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import SignupModal from "../../components/Signup/SignupModal/SignupModal";

import classes from "./SignupPage.module.css";

const SignupPage = (props) => {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div className={classes.SignupModal}>
          <SignupModal open={open} closed={closeHandler} />
        </div>
      </HomeLayout>
    </Layout>
  );
};

export default SignupPage;
