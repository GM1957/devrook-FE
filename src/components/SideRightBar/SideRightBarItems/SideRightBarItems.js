import React from "react";
import { Icon } from "semantic-ui-react";
import classes from "./SideRightBarItems.module.css";

const SideRightBarItems = (props) => {
  return (
    <div className={classes.SideRightBarItems}>
      <div className={classes.TrendingDevsCard}>
        <div className={classes.DevHeader}>Trending DevS</div>
        <div className={classes.Content}>
          <div className={classes.DevRow}>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
          </div>
          <div className={classes.DevRow}>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
            <div className={classes.Profile}>
              <Icon name="user circle" size="large" />
              <span> UserName </span> <br />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.TrendingTagsCard}>
        <div className={classes.TagHeader}>Trending TagS</div>
        <div className={classes.Content}>
          <div className={classes.TagRow}>
            <button className={classes.btnGrad}>JavaScript</button>
            <button className={classes.btnGrad}>JavaScript</button>
            <button className={classes.btnGrad}>JavaScript</button>
            <button className={classes.btnGrad}>Python</button>
            <button className={classes.btnGrad}>JavaScript</button>
            <button className={classes.btnGrad}>Paste</button>
            {/* </div>
            <div className={classes.TagRow}> */}
            <button className={classes.btnGrad}>Go Lang</button>
            <button className={classes.btnGrad}>Paste</button>
            <button className={classes.btnGrad}>Paste</button>
            <button className={classes.btnGrad}>Paste</button>
            <button className={classes.btnGrad}>Paste</button>
            <button className={classes.btnGrad}>Paste</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideRightBarItems;
