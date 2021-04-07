import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import classes from "./LoginModal.module.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/Backdrop/Backdrop";
import classNames from "classnames";
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
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
      const user = await Auth.signIn(this.state.email, this.state.password);
      this.props.login(user);
      toast.success("🦄 Loggedin Successful");
    } catch (err) {
      console.log("login failed", err);
      toast.error("login failed");
    } finally {
      this.isLoadingOFFHandler();
      this.props.closed();
    }
  };

  render() {
    let attachedClasses = [classes.LoginModal, classes.Close];

    if (this.props.open) {
      attachedClasses = [classes.LoginModal, classes.Open];
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
                  name="first-name"
                  placeholder="Example@example.com"
                  value={this.state.email}
                  onChange={(event) => this.setEmail(event.target.value)}
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
              <div className={classes.LoginButtonDiv}>
                {this.state.isLoading ? (
                  <button
                    className={classNames(
                      "fluid ui loading green button",
                      classes.LoginButton
                    )}
                    type="submit"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className={classNames(
                      "fluid ui green button",
                      classes.LoginButton
                    )}
                    type="submit"
                  >
                    Login
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
  return {Auth: state.Auth}
}
export default connect(mapStateToProps, {
  login,
})(LoginModal)

