import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../Pages/HomePage/HomePage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Layout from "../hoc/Layout";

const RouteHandler = (props) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomePage />
        </Layout>
      </Route>
      <Route path="/username" exact>
        <Layout>
          <ProfilePage />
        </Layout>
      </Route>
    </Switch>
  );
};

export default RouteHandler;
