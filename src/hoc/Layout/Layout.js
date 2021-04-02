import React, {Component} from "react";
import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from "./Layout.module.css";

class Layout extends Component {
  state = { 
    showSideDrawer: false
  }
  
  sideDrawerCloseHandler = () =>{
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerOpen = {this.sideDrawerOpenHandler} />
        <SideDrawer open={ this.state.showSideDrawer } closed = { this.sideDrawerCloseHandler }/>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
} 

export default Layout;
