import React from 'react';
import {logout} from './redux/actions/authActions';
import {connect} from 'react-redux';

const log = (props) => (
    <button onClick={props.logout}>logout</button>
);
const mapStateToProps = (state) => {
    return {Auth: state.Auth}
  }
  export default connect(mapStateToProps, {
    logout,
  })(log)