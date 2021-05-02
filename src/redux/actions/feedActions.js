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

export { setFeedQuestions, setFeedBlogs };
