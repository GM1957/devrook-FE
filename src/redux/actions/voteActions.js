const voteHandler = (payload) => {
  return {
    type: "SET_VOTES",
    payload,
  };
};

const voteCountHandler = (payload) => {
  return {
    type: "SET_VOTE_COUNT",
    payload,
  };
};

export { voteHandler, voteCountHandler };
