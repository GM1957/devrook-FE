import React from "react";
import devrookimg from "../../../assets/images/devrooklogo.png";

import classes from "./PopularDevs.module.css";

const PopularDevs = (props) => {
  const selectDevHandler = (userName) => {
    props.setSelected({
      ...props.currentSelected,
      [userName]: "1",
    });
  };

  const deselectDevHandler = (userName) => {
    let oldSelects = { ...props.currentSelected };
    delete oldSelects[userName];
    props.setSelected(oldSelects);
  };
  return (
    <div>
      {props.finishLoading ? (
        <div>
          <div className={classes.HeartLoader}></div>
        </div>
      ) : (
        <div>
          <div className={classes.Header}>
            <p>Here is some popular Devs whom you can follow</p>
            <small>
              Follow atleast one Dev to continue [{" "}
              {Object.keys(props.currentSelected).length} Dev followed ]
            </small>
          </div>

          <div className={classes.CardGroup}>
            <div className={classes.Row}>
              {props.popularDevs.map((ele, i) => {
                return (
                  <div className={classes.Column} key={"dev-col-" + i}>
                    <div className={classes.Card}>
                      <div className={classes.ImageContent}>
                        <img src={devrookimg} alt="pro pic" />
                      </div>
                      <div className={classes.NameContent}>
                        <p>{ele.name}</p>
                        <small>@{ele.userName}</small>
                        {props.currentSelected[ele.userName] ? (
                          <button
                            className={classes.UnfollowButton}
                            onClick={() => deselectDevHandler(ele.userName)}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className={classes.FollowButton}
                            onClick={() => selectDevHandler(ele.userName)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularDevs;
