import React from "react";

import classes from "./Search.module.css";

const Search = (props) => (
  <div className={classes.wrap}>
    <div className={classes.search}>
      <input className={classes.searchTerm} type="text" placeholder="Search..." />
      <button className={classes.searchButton}>
        <i className="search icon"></i>
      </button>
    </div>
  </div>
);

export default Search;
