import React, { useState } from "react";
import { apis, axios } from "../../../services";
import classes from "./BasicInfo.module.css";
import { connect } from "react-redux";
import { login } from "../../../redux/actions";

const BasicInfo = (props) => {
  const [userName, setUserName] = useState(props.defaultUserName);

  const onChangeHandler = (key, value) => {
    let oldSelected = {...props.currentSelected};
    oldSelected[key] = value;
    props.setSelected(oldSelected);
  }

  const userNameOnChangeHandler = async (value) => {
    props.setUserNameStatus("checking");
    setUserName(value);

    const result = await axios.get(apis.GET_USER_BY_USER_NAME + value);

    if (!result.data.data.length) {
      props.setUserNameStatus("passed");

      onChangeHandler("userName", value);
    } else {
      props.setUserNameStatus("failed");
    }
  };

 

  return (
    <div>
      <div className={classes.Header}>
        <p>Hello, Please give some necessary inputs to continue</p>
      </div>
      <div className={classes.BasicInfoDiv}>

        <label>
          <span style={{ color: "red" }}>*</span> User Name{"  "}
          <span>
            {props.userNameStatus === "passed" ? (
              <i className="check icon" style={{ color: "green" }} />
            ) : props.userNameStatus === "checking" ? (
              <div className={classes.CheckLoader}> </div>
            ) : (
              <i className="x icon" style={{ color: "red" }} />
            )}
          </span>
        </label>
        <input
          required
          className={
            props.userNameStatus === "failed"
              ? classes.FailedInput
              : classes.NormalInput
          }
          value={userName}
          onChange={(event) => userNameOnChangeHandler(event.target.value)}
          type="text"
        />

        <label>Short Bio</label>
        <input onChange={(event) =>onChangeHandler("bio",event.target.velue)}className={classes.NormalInput} type="text" />

        <label>Location</label>
        <input onChange={(event) =>onChangeHandler("location",event.target.velue)}className={classes.NormalInput} type="text" />

        <label>Profession</label>
        <input onChange={(event) =>onChangeHandler("profession",event.target.velue)}className={classes.NormalInput} type="text" />

        <label>Linkedin Link</label>
        <input onChange={(event) =>onChangeHandler("linkedinLink",event.target.velue)}className={classes.NormalInput} type="text" />

        <label>Github Link</label>
        <input onChange={(event) =>onChangeHandler("githubLink",event.target.velue)}className={classes.NormalInput} type="text" />

        <label>Twitter Link</label>
        <input onChange={(event) =>onChangeHandler("twitterLink",event.target.velue)}className={classes.NormalInput} type="text" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};
export default connect(mapStateToProps, {
  login,
})(BasicInfo);
