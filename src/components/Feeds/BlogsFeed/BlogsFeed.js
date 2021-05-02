import React, { useState, useEffect } from "react";
import { axios, apis } from "../../../services";
import BlogCard from "../../BlogCard/BlogCard"
import { setFeedBlogs } from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./BlogsFeed.module.css";
import HeartLoadaer from "../../EntryLoader/HeartLoader"


const BlogsFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const result = await axios.get(apis.GET_ALL_BLOGS + "/false/false");
    if (result?.data?.data?.Items) {
      props.setFeedBlogs(result.data.data.Items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.Feed?.blogsFeed === null) {
      fetchBlogs();
    }
  }, []);

  return (
   <div>
    {isLoading ? (
      <HeartLoadaer/>
    ) : (
      <div>
        <div
          className={classes.ReloadButton}
          onClick={() => fetchBlogs()}
        >
          <i className="icon sync alternate"></i>
        </div>
        {props.Feed?.blogsFeed?.map((ele, i) => {
          return <BlogCard Element={ele} key={`blg-card-${i}`} />;
        })}
      </div>
    )}
  </div>
  );
};

const mapStateToProps = (state) => {
  return {Feed: state.Feed}
}

export default connect(mapStateToProps, {
  setFeedBlogs,
})(BlogsFeed)
