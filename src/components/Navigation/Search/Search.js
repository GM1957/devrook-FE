import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Search.module.css";

const Search = (props) => {
  const [text, setText] = useState("");

  return (
    <div className={classes.wrap}>
      <div className={classes.search}>
        <input
          className={classes.searchTerm}
          type="text"
          placeholder="Search..."
          onChange={(event) => setText(event.target.value)}
        />
        <NavLink to={"/search/" + text} exact>
          <button className={classes.searchButton}>
            <i className="search icon"></i>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Search;
