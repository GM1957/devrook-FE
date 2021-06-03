const initialState = {
  votes: {},
  voteCount: {},
};

const Vote = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VOTES":
      return {
        ...state,
        votes: action.payload,
      };

    case "SET_VOTE_COUNT":
      return {
        ...state,
        voteCount: action.payload,
      };
    default:
      return state;
  }
};

export default Vote;
