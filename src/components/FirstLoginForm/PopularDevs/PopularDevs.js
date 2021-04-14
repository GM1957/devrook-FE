import React from "react";

import classes from "./PopularDevs.module.css";

const PopularDevs = (props) => {
  return (
    <div>
      <button>tanmoy</button>
      <button>grandmaster</button>
      <button>dimpu</button>
      <button>tanu</button>
      <button>nischinto</button>
      <button>guftgu</button>

      <br />
      <br />
      <button onClick={props.next}>next</button>
      <button onClick={props.back}>back</button>
    </div>
  );
};

export default PopularDevs;
