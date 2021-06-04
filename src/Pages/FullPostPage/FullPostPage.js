import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import Layout from "../../hoc/Layout";
import PostCard from "../../components/PostCard/PostCard";
import Responses from "../../components/Responses/Responses";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { axios, apis } from "../../services";
import HeartLoader from "../../components/EntryLoader/HeartLoader";
import NotFound404 from "../../components/NotFound404/NotFound404";
import classes from "./FullPostPage.module.css";

const FullPostPage = (props) => {
  const hashedUrl = props.match.params.hashedUrl;

  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [post, setPost] = useState({ like: 0 });
  const [author, setAuthor] = useState(false);

  const fetchFullPostHandler = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(apis.GET_FULL_POST + "/" + hashedUrl);
      if (!result.data.data?.postDetails) {
        setIsNotFound(true);
      } else {
        setPost(result.data.data.postDetails);
        setAuthor(result.data.data.authorDetails);
      }
    } catch (err) {
      toast.error("Internal server error, failed to fetch post");
      console.log("failed to fetch full post", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFullPostHandler();
  }, []);

  return (
    <Layout>
      <HomeLayout isRightBar={false}>
        {isLoading ? (
          <HeartLoader />
        ) : isNotFound ? (
          <NotFound404 />
        ) : (
          <div className={classes.PostDetailsArea}>
            <div className={classes.PostCard}>
              <PostCard Post={post} />
              <Responses hashedUrl={hashedUrl} Post={post} />
            </div>
            <div className={classes.ProfileCard}>
              <ProfileCard Author={author} />
            </div>
          </div>
        )}
      </HomeLayout>
    </Layout>
  );
};

export default FullPostPage;
