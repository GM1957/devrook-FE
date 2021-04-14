import React from "react";

import classes from "./BasicInfo.module.css";

const BasicInfo = (props) => {
  return (
    <div>
      <input type="text" label="name" />
      <input type="text" label="userName" />
      <input type="text" label="Bio" />
      <input type="text" label="LinkedinUrl" />
      <input type="text" label="Github url" />

      <br />
      <br />
      <button onClick={props.next}>next</button>
      <button onClick={props.back}>back</button>
    </div>
  );
};

export default BasicInfo;
