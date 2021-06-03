const initialState = {
  trendingTags: [],
  trendingDevs: [],
};

const Trending = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRENDING_TAGS":
      return {
        ...state,
        trendingTags: action.payload,
      };

    case "SET_TRENDING_DEVS":
      return {
        ...state,
        trendingDevs: action.payload,
      };
    default:
      return state;
  }
};

export default Trending;
