import React from "react";
import classes from "./LoginModal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/Backdrop/Backdrop";

const LoginModal = (props) => {
  let attachedClasses = [classes.LoginModal, classes.Close];

  if (props.open) {
    attachedClasses = [classes.LoginModal, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} zIndex="300" clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <p>hey i am login modal</p>
      </div>
    </Aux>
  );
};

export default LoginModal;
