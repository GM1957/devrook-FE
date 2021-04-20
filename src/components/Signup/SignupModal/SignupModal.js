import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import classes from "./SignupModal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/Backdrop/Backdrop";
import classNames from "classnames";
import { connect } from "react-redux";
import { login } from "../../../redux/actions";

class SignupModal extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    isLoading: false,
  };

  setEmail = (email) => {
    let newState = { ...this.state };
    newState.email = email;
    this.setState(newState);
  };

  setPassword = (password) => {
    let newState = { ...this.state };
    newState.password = password;
    this.setState(newState);
  };

  setName = (name) => {
    let newState = { ...this.state };
    newState.name = name;
    this.setState(newState);
  };

  isLoadingOnHandler = () => {
    let newState = { ...this.state };
    newState.isLoading = true;
    this.setState(newState);
  };

  isLoadingOFFHandler = () => {
    let newState = { ...this.state };
    newState.isLoading = false;
    this.setState(newState);
  };

  onSubmit = async (event) => {
    this.isLoadingOnHandler();
    event.preventDefault();

    try {
      await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          email: this.state.email,
          name: this.state.name
        },
      });
      toast.success("👻 Signup successful please check your mail-box");
      this.props.closed();
    } catch (err) {
      toast.error(err.message);
      this.isLoadingOFFHandler();
    }
  };

  render() {
    let attachedClasses = [classes.SignupModal, classes.Close];

    if (this.props.open) {
      attachedClasses = [classes.SignupModal, classes.Open];
    }

    return (
      <Aux>
        <BackDrop
          show={this.props.open}
          zIndex="300"
          clicked={this.props.closed}
        />
        <div className={attachedClasses.join(" ")}>
          <div>
            <form
              className={classNames("ui form", classes.Form)}
              onSubmit={this.onSubmit}
            >
              <div className="field">
                <label>Email</label>
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="Example@example.com"
                  value={this.state.email}
                  onChange={(event) => this.setEmail(event.target.value)}
                />
              </div>
              <div className="field">
                <label>Full Name</label>
                <input
                  required
                  type="text"
                  name="full-name"
                  placeholder="cheating santi"
                  value={this.state.name}
                  onChange={(event) => this.setName(event.target.value)}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  required
                  type="password"
                  name="last-name"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) => this.setPassword(event.target.value)}
                />
              </div>
              <div className={classes.SignupButtonDiv}>
                {this.state.isLoading ? (
                  <button
                    disabled
                    className={classNames(
                      "fluid ui loading green button",
                      classes.SignupButton
                    )}
                    type="submit"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className={classNames(
                      "fluid ui green button",
                      classes.SignupButton
                    )}
                    type="submit"
                  >
                    Signup
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};
export default connect(mapStateToProps, {
  login,
})(SignupModal);
