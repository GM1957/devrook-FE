import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { axios, apis } from "../../services";
import devrook from "../../assets/images/devrooklogo.png";
import EntryLoaderRects from "../EntryLoader/EntryLoaderRects";

import classes from "./ChattedPeople.module.css";

const ChattedPeople = (props) => {
  const [allChattedIds, setAllChattedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);

  const getAllChattedWith = async () => {
    setIsLoading(true);
    try {
      const allChattedWith = await axios.post(apis.CHATTED_WITH_IDS, {});
      if (allChattedWith.data?.data?.length) {
        setAllChattedIds(allChattedWith.data?.data);
      } else {
        setNoUserFound(true);
      }
    } catch (err) {
      console.log("failed to get all chatted people", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllChattedWith();
  }, []);

  return (
    <div className={classes.MainContainer}>
      <div className={classes.MessagesHeader}>
        <p>Messages</p>
      </div>

      <div className={classes.UsersContainer}>
        {isLoading ? (
          <div className={classes.EntryLoader}>
            <EntryLoaderRects />
          </div>
        ) : (
          <div>
            {noUserFound ? (
              <div className={classes.NoUserFound}>
                🙃
                <p> No Chat Found</p>
              </div>
            ) : (
              allChattedIds.map((ele, i) => {
                return (
                  <NavLink
                    activeClassName={classes.UserBoxActive}
                    to={"/me/messages/" + ele.userName}
                    key={"pro-card" + i}
                  >
                    <div className={classes.UserBox}>
                      <div className={classes.ImageSection}>
                        <img
                          src={
                            ele.profilePicture ? ele.profilePicture : devrook
                          }
                          alt="pro-pic"
                        />
                      </div>
                      <div className={classes.UserNameSection}>
                        <h6>{ele.name}</h6>
                        <div className={classes.UserName}>
                          <p>@{ele.userName}</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChattedPeople;
