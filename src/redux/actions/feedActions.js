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

export { setFeedQuestions, setFeedBlogs, isPersonalizedBlogsFetched, isPersonalizedQuestionsFetched };
