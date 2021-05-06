const initialState = {
  questionsFeed: [],
  blogsFeed: [],
  isPersonalizedBlogsFetched: false,
  isPersonalizedQuestionsFetched: false,
};

const Feed = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FEED_QUESTIONS":
      return {
        ...state,
        questionsFeed: action.payload,
      };
    case "SET_FEED_BLOGS":
      return {
        ...state,
        blogsFeed: action.payload,
      };
    case "SET_PERSONALIZED_BLOGS_FETCH_STATUS":
      return {
        ...state,
        isPersonalizedBlogsFetched: action.payload,
      };
    case "SET_PERSONALIZED_QUESTIONS_FETCH_STATUS":
      return {
        ...state,
        isPersonalizedQuestionsFetched: action.payload,
      };
    default:
      return state;
  }
};

export default Feed;
