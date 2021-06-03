import React from "react";
import { NavLink } from "react-router-dom";
import NotFound404GIF from "../../assets/images/404tribe.gif";

import classes from "./NotFound404.module.css";

const NotFound404 = () => (
  <section className={classes.Page404}>
    <header>404 No Page Found</header>
    <div
      className={classes.Bg404}
      style={{ backgroundImage: `url(${NotFound404GIF})` }}
    />

    <div className={classes.ContentBox404}>
      <h3>Look like you're lost</h3>

      <p>the page you are looking for not avaible!</p>

      <NavLink to="/" className={classes.Link404}>
        Go to Home
      </NavLink>
    </div>
  </section>
);

export default NotFound404;
