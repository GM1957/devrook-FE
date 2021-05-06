const voteHandler = (payload) => {
  return {
    type: "SET_VOTES",
    payload,
  };
};

export { voteHandler };
