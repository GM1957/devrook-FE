const setFeedQuestions = (payload) => {
  return {
    type: "SET_FEED_QUESTIONS",
    payload,
  };
};

const setFeedBlogs = (payload) => {
  return {
    type: "SET_FEED_BLOGS",
    payload,
  };
};

const setMainFeed = (payload) => {
  return {
    type: "SET_MAIN_FEED",
    payload,
  };
};

const setGlobalFeed = (payload) => {
  return {
    type: "SET_GLOBAL_FEED",
    payload,
  };
};

const setDevFeed = (payload) => {
  return {
    type: "SET_DEV_FEED",
    payload,
  };
};

const isPersonalizedBlogsFetched = (payload) => {
  return {
    type: "SET_PERSONALIZED_BLOGS_FETCH_STATUS",
    payload,
  };
};

const isPersonalizedQuestionsFetched = (payload) => {
  return {
    type: "SET_PERSONALIZED_QUESTIONS_FETCH_STATUS",
    payload,
  };
};

const isPersonalizedMainFeedFetched = (payload) => {
  return {
    type: "SET_PERSONALIZED_MAIN_FEED_FETCH_STATUS",
    payload,
  };
};

const isPersonalizedDevFeedFetched = (payload) => {
  return {
    type: "SET_PERSONALIZED_DEV_FEED_FETCH_STATUS",
    payload,
  };
};

export {
  setFeedQuestions,
  setFeedBlogs,
  setMainFeed,
  setGlobalFeed,
  setDevFeed,
  isPersonalizedBlogsFetched,
  isPersonalizedQuestionsFetched,
  isPersonalizedMainFeedFetched,
  isPersonalizedDevFeedFetched,
};
