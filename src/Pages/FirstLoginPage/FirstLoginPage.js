import React from "react";
import FirstLoginForm from "../../components/FirstLoginForm/FirstLoginForm";

import classes from "./FirstLoginPage.module.css";

const FirstLoginPage = (props) => (
  <div>
    <div className={classes.bg}></div>
    <div className={[classes.bg, classes.bg2].join(" ")}></div>
    <div className={[classes.bg, classes.bg3].join(" ")}></div>
    <div className={classes.Content}>
      <FirstLoginForm />
    </div>
  </div>
);

export default FirstLoginPage;
