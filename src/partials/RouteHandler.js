import { Switch, Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NotFound404 from "../components/NotFound404/NotFound404";

import HomePage from "../Pages/HomePage/HomePage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage";
import AskQuestionPage from "../Pages/AskQuestionPage/AskQuestionPage";
import CreateBlogPage from "../Pages/CreateBlogPage/CreateBlogPage";
import BlogFeedPage from "../Pages/BlogFeedPage/BlogFeedPage";
import QuestionFeedPage from "../Pages/QuestionFeedPage/QuestionFeedPage";
import DevFeedPage from "../Pages/DevFeedPage/DevFeedPage";
import MessagesPage from "../Pages/MessagesPage/MessagesPage";
import FullPostPage from "../Pages/FullPostPage/FullPostPage";
import InsideTagPage from "../Pages/InsideTagPage/InsideTagPage";
import TagsFollowedByMePage from "../Pages/TagsFollowedByMePage/TagsFollowedByMePage";
import GlobalFeedPage from "../Pages/GlobalFeedPage/GlobalFeedPage";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignupPage from "../Pages/SignupPage/SignupPage";

const RouteHandler = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />

        <Route path="/:username" component={ProfilePage} exact />

        <Route path="/feed/blogs" component={BlogFeedPage} exact />

        <Route path="/feed/questions" component={QuestionFeedPage} exact />

        <Route path="/feed/devfeed" component={DevFeedPage} exact />

        <Route path="/search/:searchtext" component={SearchPage} exact />

        <Route path="/user/login" component={LoginPage} exact />

        <Route path="/post/:hashedUrl" component={FullPostPage} exact />

        <Route path="/tag/:tagName" component={InsideTagPage} exact />

        <Route path="/user/signup" component={SignupPage} exact />

        <Route path="/explore/globalfeed" component={GlobalFeedPage} exact />

        <Route path="/profile/edit" exact>
          {props.Auth?.isLoggedIn ? (
            <EditProfilePage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/new/question">
          {props.Auth?.isLoggedIn ? (
            <AskQuestionPage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/new/blog" exact>
          {props.Auth?.isLoggedIn ? (
            <CreateBlogPage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/me/messages" exact>
          {props.Auth?.isLoggedIn ? (
            <MessagesPage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/me/messages/:username" exact>
          {props.Auth?.isLoggedIn ? (
            <MessagesPage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/tags/all" exact>
          {props.Auth?.isLoggedIn ? (
            <TagsFollowedByMePage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route path="/my/dashboard" exact>
          {props.Auth?.isLoggedIn ? (
            <DashBoardPage />
          ) : (
            <Redirect
              to={{
                pathname: "/user/login",
              }}
            />
          )}
        </Route>

        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {})(RouteHandler);
