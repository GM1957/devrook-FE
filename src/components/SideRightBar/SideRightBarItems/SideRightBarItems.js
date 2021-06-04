import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { axios, apis } from "../../../services";
import { Icon } from "semantic-ui-react";
import { setTrendingDevs, setTrendingTags } from "../../../redux/actions";
import { connect } from "react-redux";
import EntryLoaderRects from "../../EntryLoader/EntryLoaderRects";

import classes from "./SideRightBarItems.module.css";

const SideRightBarItems = (props) => {
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [isDevsLoading, setIsDevsLoading] = useState(false);

  const fetchTopTags = async () => {
    setIsTagsLoading(true);
    try {
      const result = await axios.get(apis.GET_POPULAR_TAGS + "/15/false");
      if (result?.data?.data?.Items?.length) {
        props.setTrendingTags(result?.data.data.Items);
      }
    } catch (err) {
      console.log("failed to fetch popular tags", err);
    }
    setIsTagsLoading(false);
  };

  const fetchTopDevs = async () => {
    setIsDevsLoading(true);
    try {
      const result = await axios.get(apis.GET_TOP_REPUTED_USERS + "/12/false");
      if (result?.data?.data?.Items?.length) {
        props.setTrendingDevs(result.data.data.Items);
      }
    } catch (err) {
      console.log("failed to fetch popular devs", err);
    }
    setIsDevsLoading(false);
  };

  useEffect(() => {
    if (!props.Trending.trendingTags.length) {
      fetchTopTags();
    }
    if (!props.Trending.trendingDevs.length) {
      fetchTopDevs();
    }
  }, []);

  return (
    <div className={classes.SideRightBarItems}>
      <div className={classes.TrendingDevsCard}>
        <div className={classes.DevHeader}>Trending DevS</div>
        <div className={classes.DevsContent}>
          {isDevsLoading ? (
            <div className={classes.EntryLoader}>
              <EntryLoaderRects />
            </div>
          ) : (
            <div className={classes.DevRow}>
              {props.Trending.trendingDevs.map((item, i) => {
                return (
                  <div className={classes.DevColumn} key={"tag-btn-" + i}>
                    <NavLink to={"/" + item.userName} exact>
                      <div className={classes.Profile}>
                        <span className={classes.UserIcon}>
                          <Icon name="user circle" size="large" />
                        </span>
                        <span> {item.userName}</span>{" "}
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={classes.TrendingTagsCard}>
        <div className={classes.TagHeader}>Trending TagS</div>
        <div className={classes.Content}>
          {isTagsLoading ? (
            <div className={classes.EntryLoader}>
              <EntryLoaderRects />
            </div>
          ) : (
            <div className={classes.TagRow}>
              {props.Trending.trendingTags.map((item, i) => (
                <NavLink to={"/tag/" + item.tagName} exact key={"tag-box" + i}>
                  <button className={classes.btnGrad}>{item.tagName}</button>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Trending: state.Trending };
};

export default connect(mapStateToProps, {
  setTrendingDevs,
  setTrendingTags,
})(SideRightBarItems);
