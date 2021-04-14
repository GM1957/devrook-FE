import React, { useState, useEffect } from "react";
import classes from "./Interests.module.css";
import EntryLoaderPostman from "../../EntryLoader/EntryLoaderPostman";
import { apis, axios } from "../../../services";

const Interests = (props) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown",
    "gray",
  ];
  const [popularTags, setPopularTags] = useState([]);

  const randomColor = () => {
    return colors[Math.floor(Math.random() * 13)];
  };

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

  const fetchPopularTags = async () => {
    try {
      let responses = await axios.get(apis.GET_POPULAR_TAGS);
      console.log("data", responses.data.data);
      setPopularTags(responses.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPopularTags();
  }, []);

  return (
    <div>
      <div className={classes.Header}>
        <p>What are you interested in ?</p>
        <small>Choose atleast one tag to continue [ {Object.keys(props.currentSelected).length} tags followed ]</small>
      </div>
      <div className={classes.CardGroup}>
        {!popularTags.length ? (
          <div className={classes.Postman}>
            <EntryLoaderPostman />
          </div>
        ) : (
          <div className={classes.Row}>
            {popularTags.map((ele, i) => {
              return (
                <div className={classes.Column}>
                  <div
                    className={classes.Card}
                    style={{ borderBottom: `2px solid ${randomColor()}` }}
                    key={`tagbox-${i}`}
                  >
                    <p key={`tagname-${i}`}>#{ele.tagName}</p>
                    {props.currentSelected[ele.tagName] ? (
                      <button onClick={() => deselectTagHandler(ele.tagName)}>
                        Unfollow
                      </button>
                    ) : (
                      <button onClick={() => selectTagHandler(ele.tagName)}>
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
