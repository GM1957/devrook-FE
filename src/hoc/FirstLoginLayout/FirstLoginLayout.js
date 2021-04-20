import React from "react";
import Aux from "../Aux";

import classes from "./FirstLoginLayout.module.css";

const FirstLoginLayout = (props) => {
  const buttonControllar = () => {
    if (props.currentStep === 1 && props.selectedTagsCount > 0) {
      return classes.ContinueButton;
    } else if (props.currentStep === 2 && props.userNameStatus === "passed") {
      return classes.ContinueButton;
    } else if (props.currentStep === 3 && props.selectedDevsCount > 0) {
      if (props.finishLoading) return classes.ContinueButtonDisabled;
      return classes.ContinueButton;
    } else {
      return classes.ContinueButtonDisabled;
    }
  };

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
              props.finishLoading ? (
                <i className="chess rook icon" />
              ) : (
                <i className="arrow circle left icon" />
              )
            ) : (
              <i className="chess rook icon" />
            )}
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
          {props.currentStep === 3 ? (
            <button
              className={buttonControllar()}
              onClick={props.onFinishHandler}
            >
              <p className={classes.ButtonText}>
                {props.finishLoading ? "Finishing..." : "Finish"}
              </p>
            </button>
          ) : (
            <button className={buttonControllar()} onClick={props.next}>
              <p className={classes.ButtonText}>Continue</p>
            </button>
          )}
        </div>
      </div>

      <div className={classes.Seperator}></div>

      {props.children}
    </Aux>
  );
};

export default FirstLoginLayout;
