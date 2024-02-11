import { Route, BrowserRouter, Switch } from "react-router-dom";

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

        <Route path="/profile/edit" component={EditProfilePage} exact />

        <Route path="/new/question" component={AskQuestionPage} exact />

        <Route path="/new/blog" component={CreateBlogPage} exact />

        <Route path="/me/messages" component={MessagesPage} exact />

        <Route path="/me/messages/:username" component={MessagesPage} exact />

        <Route path="/tags/all" component={TagsFollowedByMePage} exact />

        <Route path="/my/dashboard" component={DashBoardPage} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default RouteHandler;
