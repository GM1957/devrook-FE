import React from "react";
import Aux from "../Aux";

import classes from "./FirstLoginLayout.module.css";

const FirstLoginLayout = (props) => {
  return (
    <Aux>
      <div className={classes.TopNav}>
        <div className={classes.BackButtonContainer}>
          <div
            className={
              props.currentStep > 1
                ? classes.BackButton
                : classes.BackButtonDisabled
            }
            onClick={props.back}
          >
            {props.currentStep > 1 ? (
              <i className="arrow circle left icon" />
            ) : <i className="chess rook icon" />}
          </div>
        </div>

        <div className={classes.DotContainer}>
          <div
            className={[
              classes.TopNavDots,
              props.currentStep > 0 ? classes.DotActive : "",
            ].join(" ")}
          ></div>
          <div
            className={[
              classes.TopNavDots,
              props.currentStep > 1 ? classes.DotActive : "",
            ].join(" ")}
          ></div>
          <div
            className={[
              classes.TopNavDots,
              props.currentStep > 2 ? classes.DotActive : "",
            ].join(" ")}
          ></div>
        </div>

        <div className={classes.ContinueButtonContainer}>
          <button
            className={
              props.selectCount > 0
                ? classes.ContinueButton
                : classes.ContinueButtonDisabled
            }
            onClick={props.next}
          >
            <p className={classes.ButtonText}>Continue</p>
          </button>
        </div>
      </div>

      <div className={classes.Seperator}></div>

      {props.children}
    </Aux>
  );
};

export default FirstLoginLayout;
