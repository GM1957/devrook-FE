import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axios, apis } from "../../services";
import { connect } from "react-redux";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import EntryLoaderRects from "../../components/EntryLoader/EntryLoaderRects";

import classes from "./DashBoardPage.module.css";

const DashBoardPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setDeleting] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchPostsHandler = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        apis.DEV_POSTS +
          "/" +
          props?.Auth?.cognitoUserInfo?.attributes?.profile +
          "/false/false"
      );

      if (result?.data?.data?.Items) {
        setPosts(result.data.data.Items);
      }
    } catch (err) {
      console.log("failed to fetch dashboard", err);
    }
    setIsLoading(false);
  };

  const deletePostHandler = async (url, index) => {
    const oldIsDeleting = { ...isDeleting };
    oldIsDeleting[index] = true;
    setDeleting(oldIsDeleting);
    try {
      const result = await axios.delete(apis.DELETE_POST, {
        data: { postUrl: url },
      });
      if (result.data.statusCode === 400) {
        toast.error(result.data.message);
      } else {
        const oldPosts = [...posts];
        oldPosts[index] = undefined;
        setPosts(oldPosts);
        toast.success("👻 Post is deleted successfully");
      }
    } catch (err) {
      toast.error("Internal server error");
      console.log(err);
    }
    const newIsDeleting = { ...isDeleting };
    delete newIsDeleting[index];
    setDeleting(newIsDeleting);
  };

  useEffect(() => {
    fetchPostsHandler();
  }, [props?.Auth?.cognitoUserInfo?.attributes?.profile]);

  return (
    <Layout>
      <HomeLayout isRightBar={true}>
        <div>
          <div className={classes.DashboardHeader}>
            <p>DASHBOARD</p>
          </div>

          {isLoading ? (
            <div className={classes.EntryLoader}>
              <EntryLoaderRects />
            </div>
          ) : (
            <div>
              {!posts.length ? (
                <div className={classes.EntryLoader}>NO POSTS FOUND</div>
              ) : (
                posts.map((item, i) => {
                  if (item) {
                    if (item.postType === "blog") {
                      return (
                        <div className={classes.Card} key={i + "card"}>
                          <div className={classes.DetailSection}>
                            <p className={classes.HeaderHashedUrl}>
                              <b>{item.hashedUrl}</b>
                            </p>
                            <small>
                              Type: <b>Blog</b>, UpVotes: <b>{item.upVote}</b>,
                              DownVotes: <b>{item.downVote}</b>, Responses:{" "}
                              <b>{item.responses}</b>
                            </small>
                          </div>
                          <div
                            className={classes.ButtonSection}
                            onClick={() => deletePostHandler(item.hashedUrl, i)}
                          >
                            <div className={classes.EditButton}>EDIT</div>
                            <div className={classes.DeleteButton}>
                              {isDeleting[i] ? (
                                <div className="ui small active centered inline loader"></div>
                              ) : (
                                "DELETE"
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else if (item.postType === "question") {
                      return (
                        <div className={classes.Card} key={i + "card"}>
                          <div className={classes.DetailSection}>
                            <p className={classes.HeaderHashedUrl}>
                              <b>{item.hashedUrl}</b>
                            </p>
                            <small>
                              Type: <b>Question</b>, UpVotes:{" "}
                              <b>{item.upVote}</b>, DownVotes:{" "}
                              <b>{item.downVote}</b>, Answers:{" "}
                              <b>{item.responses}</b>
                            </small>
                          </div>
                          <div
                            className={classes.ButtonSection}
                            onClick={() => deletePostHandler(item.hashedUrl, i)}
                          >
                            <div className={classes.EditButton}>EDIT</div>
                            <div className={classes.DeleteButton}>
                              {isDeleting[i] ? (
                                <div className="ui small active centered inline loader"></div>
                              ) : (
                                "DELETE"
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else return null;
                  } else return null;
                })
              )}
            </div>
          )}
        </div>
      </HomeLayout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {})(DashBoardPage);
