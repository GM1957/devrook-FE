import React, { Component } from "react";
import Aux from "./Aux";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import LoginModal from "../components/Login/LoginModal/LoginModal";
import SignupModal from "../components/Signup/SignupModal/SignupModal";
import { connect } from "react-redux";
import { login } from "../redux/actions";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    showLoginModal: false,
    showSignupModal: false,
  };

  sideDrawerOpenHandler = () => {
    let newStateForOpenSD = { ...this.state };
    newStateForOpenSD.showSideDrawer = true;
    this.setState(newStateForOpenSD);
  };

  sideDrawerCloseHandler = () => {
    let newStateForCloseSD = { ...this.state };
    newStateForCloseSD.showSideDrawer = false;
    this.setState(newStateForCloseSD);
  };

  loginModalOpenHandler = () => {
    let newStateForOpenLM = { ...this.state };
    newStateForOpenLM.showLoginModal = true;
    this.setState(newStateForOpenLM);
  };

  loginModalCloseHandler = () => {
    let newStateForCloseLM = { ...this.state };
    newStateForCloseLM.showLoginModal = false;
    this.setState(newStateForCloseLM);
  };

  signupModalOpenHandler = () => {
    let newStateForOpenSM = { ...this.state };
    newStateForOpenSM.showSignupModal = true;
    this.setState(newStateForOpenSM);
  };

  signupModalCloseHandler = () => {
    let newStateForCloseSM = { ...this.state };
    newStateForCloseSM.showSignupModal = false;
    this.setState(newStateForCloseSM);
  };

  render() {
    return (
      <Aux>
        <Toolbar
          sideDrawerOpen={this.sideDrawerOpenHandler}
          loginModalOpen={this.loginModalOpenHandler}
          signupModalOpen={this.signupModalOpenHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          loginModalOpen={this.loginModalOpenHandler}
          signupModalOpen={this.signupModalOpenHandler}
        />
        {!this.props.Auth.isLoggedIn ? (
          <>
            <LoginModal
              open={this.state.showLoginModal}
              closed={this.loginModalCloseHandler}
            />
            <SignupModal
              open={this.state.showSignupModal}
              closed={this.signupModalCloseHandler}
            />{" "}
          </>
        ) : null}

        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};
export default connect(mapStateToProps, {
  login,
})(Layout);
