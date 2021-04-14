import React, { setState } from "react";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import classes from "./HomePage.module.css";
import { NavLink } from "react-router-dom";

const HomePage = (props) => {
  return (
    <HomeLayout>
      <header className={classes.HomeHeader}>
        <NavLink activeClassName={classes.active} to="/" exact>
          <button className={classes.HomeHeaderButton}>Questions</button>
        </NavLink>
        <NavLink activeClassName={classes.active} to="/blogs" exact>
        <button className={classes.HomeHeaderButton}>Blogs</button>
        </NavLink>
        <button className={classes.HomeHeaderButton}>Feed</button>
        <button className={classes.HomeHeaderButton}>DevFeed</button>
      </header>

      <div>
        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>

        <div className="ui card" style={{ width: "100%" }}>
          <div className="content">
            <i className="right floated like icon"></i>
            <i className="right floated star icon"></i>
            <div className="header">Cute Dog</div>
            <div className="description">
              <p></p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="like icon"></i>
              Like
            </span>
            <span className="right floated star">
              <i className="star icon"></i>
              Favorite
            </span>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
