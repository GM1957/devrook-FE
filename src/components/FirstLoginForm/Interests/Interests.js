import classes from "./Interests.module.css";
import EntryLoaderPostman from "../../EntryLoader/EntryLoaderPostman";
import { randomColor } from "../../../services";

const Interests = (props) => {
  const selectTagHandler = (tagName) => {
    props.setSelected({
      ...props.currentSelected,
      [tagName]: "1",
    });
  };

  const deselectTagHandler = (tagName) => {
    let oldSelects = { ...props.currentSelected };
    delete oldSelects[tagName];
    props.setSelected(oldSelects);
  };

  return (
    <div>
      <div className={classes.Header}>
        <p>What are you interested in ?</p>
        <small>
          Choose atleast one tag to continue [{" "}
          {Object.keys(props.currentSelected).length} tags followed ]
        </small>
      </div>
      <div className={classes.CardGroup}>
        {!props.popularTags.length ? (
          <div className={classes.Postman}>
            <EntryLoaderPostman />
          </div>
        ) : (
          <div className={classes.Row}>
            {props.popularTags.map((ele, i) => {
              return (
                <div key={`column-${i}`} className={classes.Column}>
                  <div
                    className={classes.Card}
                    style={{ borderBottom: `2px solid ${randomColor()}` }}
                  >
                    <p>#{ele.tagName}</p>
                    {props.currentSelected[ele.tagName] ? (
                      <button
                        className={classes.UnfollowButton}
                        onClick={() => deselectTagHandler(ele.tagName)}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className={classes.FollowButton}
                        onClick={() => selectTagHandler(ele.tagName)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interests;
