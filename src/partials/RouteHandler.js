import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import EditProfilePage from "../Pages/EditProfilePage/EditProfilePage";
import AskQuestionPage from "../Pages/AskQuestionPage/AskQuestionPage";
import CreateBlogPage from "../Pages/CreateBlogPage/CreateBlogPage";
import BlogFeedPage from "../Pages/BlogFeedPage/BlogFeedPage";
import QuestionFeedPage from "../Pages/QuestionFeedPage/QuestionFeedPage";
import DevFeedPage from "../Pages/DevFeedPage/DevFeedPage";
import MessagesPage from "../Pages/MessagesPage/MessagesPage";

const RouteHandler = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage}  exact />

        <Route path="/:username" component={ProfilePage} exact />

        <Route path="/profile/edit" component={EditProfilePage} exact/>

        <Route path="/new/question" component={AskQuestionPage} exact/>

        <Route path="/new/blog" component={CreateBlogPage} exact/>

        <Route path="/feed/blogs" component={BlogFeedPage} exact/>

        <Route path="/feed/questions" component={QuestionFeedPage} exact/>

        <Route path="/feed/devfeed" component={DevFeedPage} exact/>

        <Route path="/me/messages" component={MessagesPage} exact/>

        <Route path="/me/messages/:username" component={MessagesPage} exact/>
      </Switch>
    </BrowserRouter>
  );
};

export default RouteHandler;
