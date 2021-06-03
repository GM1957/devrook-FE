import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore from "./redux";

import { awsConfig } from "./services";
import Amplify from "aws-amplify";
import AuthGuard from "./partials/AuthGuard";

Amplify.configure(awsConfig.aws_amplify_config);

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AuthGuard />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </Provider>
    );
  }
}

export default App;

// REACT TOAST EXAMPLE

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const notify = () =>
// toast.success(" Wow so easy!", {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// });
// <button onClick={notify}>Notify!</button>
