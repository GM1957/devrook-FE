import React, { useState, useEffect } from "react";
import { axios, apis } from "../../../services";
import QuestionCard from "../../QuestionCard/QuestionCard";
import { setFeedQuestions } from "../../../redux/actions";
import { connect } from "react-redux";
import classes from "./QuestionsFeed.module.css";
import HeartLoadaer from "../../EntryLoader/HeartLoader";

const QuestionsFeed = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const result = await axios.get(apis.GET_ALL_QUESTIONS + "/false/false");
    if (result?.data?.data?.Items) {
      props.setFeedQuestions(result.data.data.Items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.Feed?.questionsFeed.length) {
      fetchQuestions();
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <HeartLoadaer />
      ) : (
        <div>
          <div
            className={classes.ReloadButton}
            onClick={() => fetchQuestions()}
          >
            <i className="icon sync alternate"></i>
          </div>
          {props.Feed?.questionsFeed?.map((ele, i) => {
            return <QuestionCard Element={ele} key={`qs-card-${i}`} />;
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed };
};

export default connect(mapStateToProps, {
  setFeedQuestions,
})(QuestionsFeed);
