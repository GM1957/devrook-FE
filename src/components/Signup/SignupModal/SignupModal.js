import React from "react";
import classes from "./SignupModal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/Backdrop/Backdrop";

const SignupModal = (props) => {
  let attachedClasses = [classes.SignupModal, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SignupModal, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} zIndex="300" clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <p>hey i am signup modal</p>
      </div>
    </Aux>
  );
};

export default SignupModal;
