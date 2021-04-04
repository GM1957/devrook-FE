import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Provider } from 'react-redux';
import configureStore from "./redux";

import  { awsConfig } from "./services"
import Amplify from 'aws-amplify';
Amplify.configure(awsConfig.aws_amplify_config)

const store = configureStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Layout>
          <p>hii</p>
        </Layout>
      </Provider>
        
    )
  }
}

export default App;

