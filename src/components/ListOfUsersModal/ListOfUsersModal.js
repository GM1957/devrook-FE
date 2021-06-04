import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import RookLogo from "../../assets/images/devrooklogo.png";
import EntryLoaderRects from "../EntryLoader/EntryLoaderRects";

import { axios, apis } from "../../services";

import classes from "./ListOfUsersModal.module.css";

const ListOfUsersModal = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let result;

      if (props.Type === "followings") {
        result = await axios.get(
          apis.GET_USERS_I_FOLLOW + "/" + props.UserName + "/false/false"
        );
        setAllUsers(result.data.data.Items);
      }
      if (props.Type === "followers") {
        result = await axios.get(
          apis.GET_MY_FOLLOWERS + "/" + props.UserName + "/false/false"
        );
        setAllUsers(result.data.data.Items);
      }

      if (props.Type === "devsOfTag") {
        result = await axios.get(
          apis.DEVS_WHO_FOLLOW_THE_TAG + "/" + props.TagName + "/false/false"
        );
        setAllUsers(result.data.data.Items);
      }
    } catch (err) {
      console.log("failed to fetch list of users under a tag", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          {isLoading ? (
            <div className={classes.CenterAligner}>
              <EntryLoaderRects />{" "}
            </div>
          ) : !allUsers.length ? (
            <div className={classes.CenterAligner}>
              No follower found of this tag
            </div>
          ) : (
            allUsers.map((userItem, i) => {
              const user = userItem.length ? userItem[0] : userItem;
              return (
                <NavLink to={"/" + user.userName} exact>
                  <div className={classes.UsersCard} key={`user-card-${i}`}>
                    <div className={classes.UserImageSection}>
                      <img
                        src={
                          user?.profilePicture?.length
                            ? user?.profilePicture
                            : RookLogo
                        }
                        alt="userImage"
                      />
                    </div>
                    <div className={classes.NameUserNameSection}>
                      <p>
                        <b>{user.name}</b>
                      </p>
                      <strong>@{user.userName}</strong>
                    </div>
                  </div>
                </NavLink>
              );
            })
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ListOfUsersModal;
