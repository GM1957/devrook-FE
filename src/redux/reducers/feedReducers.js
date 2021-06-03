const initialState = {
  questionsFeed: [],
  blogsFeed: [],
  mainFeed: [],
  devFeed: [],
  globalFeed: [],
  isPersonalizedBlogsFetched: false,
  isPersonalizedQuestionsFetched: false,
  isPersonalizedMainFeedFetched: false,
  isPersonalizedDevFeedFetched: false,
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

    case "SET_MAIN_FEED":
      return {
        ...state,
        mainFeed: action.payload,
      };

    case "SET_GLOBAL_FEED":
      return {
        ...state,
        globalFeed: action.payload,
      };

    case "SET_DEV_FEED":
      return {
        ...state,
        devFeed: action.payload,
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

    case "SET_PERSONALIZED_MAIN_FEED_FETCH_STATUS":
      return {
        ...state,
        isPersonalizedMainFeedFetched: action.payload,
      };

    case "SET_PERSONALIZED_DEV_FEED_FETCH_STATUS":
      return {
        ...state,
        isPersonalizedDevFeedFetched: action.payload,
      };

    default:
      return state;
  }
};

export default Feed;
