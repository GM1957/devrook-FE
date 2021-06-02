import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import RookLogo from "../../assets/images/devrooklogo.png";

import { axios, apis } from "../../services";

import classes from "./ListOfUsersModal.module.css";

const ListOfUsersModal = (props) => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          {allUsers.map((userItem, i) => {
            const user = userItem.length ? userItem[0] : userItem;
            return (
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
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default ListOfUsersModal;
