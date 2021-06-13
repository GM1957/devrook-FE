import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axios, apis } from "../../services";
import UpVoteButton from "../VoteButtons/UpVoteButton/UpVoteButton";
import DownVoteButton from "../VoteButtons/DownVoteButton/DownVoteButton";
import { voteHandler, voteCountHandler } from "../../redux/actions";
import { connect } from "react-redux";
import DevRookLogo from "../../assets/images/devrooklogo.png";
import { NavLink, useHistory } from "react-router-dom";
import EntryLoaderRects from "../../components/EntryLoader/EntryLoaderRects";
import classes from "./Responses.module.css";

const Responses = (props) => {
  const history = useHistory();
  const [allResponses, setAllResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseBody, setResponseBody] = useState("");

  const fetchAllResponses = async () => {
    setIsLoading(true);
    try {
      const voteObj = { ...props.Vote.votes };
      let voteCountObj = {};

      voteCountObj[props.hashedUrl] = {
        upVotes: props.Post.upVote,
        downVotes: props.Post.downVote,
        likes: props.Post.like ? props.Post.like : 0,
      };

      // this is to find vote status of the post also
      const voteIds = [props.hashedUrl];

      const result = await axios.get(
        apis.GET_ALL_RESPONSES + "/" + props.hashedUrl + "/false/false"
      );

      if (result.data.data?.Items) {
        const data = [];

        result.data.data.Items.forEach((item, i) => {
          data.push({ ...item, ...result.data.data.users[i][0] });

          voteIds.push(item.responseId);

          voteCountObj[item.responseId] = {
            upVotes: item.upVote,
            downVotes: item.downVote,
            likes: item.like ? item.like : 0,
          };
        });

        setAllResponses(data);

        setIsLoading(false);
      }

      if (props.Auth?.isLoggedIn) {
        const previousVoteDetails = await axios.post(
          apis.GET_USER_PREVIOUS_VOTES,
          { voteIds }
        );

        previousVoteDetails.data.data.forEach((item) => {
          voteObj[item.voteId] = {
            liked: item.voteType === "like" ? true : false,
            upVotted: item.voteType === "upVote" ? true : false,
            downVotted: item.voteType === "downVote" ? true : false,
          };
        });

        props.voteHandler(voteObj);
      }
      props.voteCountHandler({ ...props.Vote.voteCount, ...voteCountObj });
    } catch (err) {
      toast.error("Internal server error, failed to fetch responses");
      console.log("failed to fetch responses", err);
    }
    setIsLoading(false);
  };

  const submitResponseHandler = async () => {
    if (!props?.Auth?.isLoggedIn) return history.push("/user/login");

    try {
      const oldResponseBody = "" + responseBody.toString();

      setResponseBody("");

      const submitResponse = await axios.post(apis.CREATE_RESPONSE, {
        postUrl: props.hashedUrl,
        responseBody: oldResponseBody,
      });

      const responseArr = [...allResponses];

      responseArr.push({
        userName: props.Auth.userdetails.userName,
        profilePicture: props.Auth.userdetails.profilePicture,
        responseBody: oldResponseBody,
        responseId: submitResponse.data.data.responseId,
      });
      setAllResponses([...responseArr]);

      const newVoteObj = {};
      newVoteObj[submitResponse.data.data.responseId] = {
        upVotes: 0,
        downVotes: 0,
        likes: 0,
      };

      props.voteCountHandler({ ...props.Vote.voteCount, ...newVoteObj });
      toast.success("Successfully submitted the response 😁");
    } catch (err) {
      toast.error("Internal server error, failed to submit the response");
      console.log("failed to submit the response", err);
    }
  };

  useEffect(() => {
    fetchAllResponses();
  }, [props.Auth?.isLoggedIn]);
  return (
    <div>
      {isLoading ? (
        <div className={classes.EntryLoader}>
          <EntryLoaderRects />
        </div>
      ) : (
        <div>
          <div className={classes.AllResponsesSection}>
            {allResponses.map((response, i) => {
              return (
                <div className={classes.ResponseCard} key={"response-" + i}>
                  <div className={classes.UpVoteDownVoteSection}>
                    <UpVoteButton Element={response} Type="response" />
                    <div className={classes.VoteCount}>
                      {props.Vote?.voteCount[response.responseId]?.upVotes -
                        Math.abs(
                          props.Vote?.voteCount[response.responseId]?.downVotes
                        )}
                    </div>
                    <DownVoteButton Element={response} Type="response" />
                  </div>
                  <div className={classes.ResponseBody}>
                    <p>{response.responseBody}</p>
                  </div>
                  <div className={classes.ResponseBy}>
                    <NavLink to={"/" + response.userName} exact>
                      <img
                        src={
                          response?.profilePicture &&
                          response.profilePicture.length
                            ? response.profilePicture
                            : DevRookLogo
                        }
                        alt="userImage"
                      />
                      <p>{response.userName}</p>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.AddNewResponse}>
            <div className={classes.InputBox}>
              <input
                onChange={(event) => setResponseBody(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") return submitResponseHandler();
                }}
                type="text"
                placeholder={
                  props.Post.postType === "question"
                    ? "Answer This Question"
                    : "Add Your Response"
                }
                value={responseBody}
              />
              <div
                className={classes.SubmitButton}
                onClick={() => submitResponseHandler()}
              >
                SUBMIT
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Feed: state.Feed, Auth: state.Auth, Vote: state.Vote };
};

export default connect(mapStateToProps, {
  voteHandler,
  voteCountHandler,
})(Responses);
