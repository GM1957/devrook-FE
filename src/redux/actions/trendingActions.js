const setTrendingTags = (payload) => {
  return {
    type: "SET_TRENDING_TAGS",
    payload,
  };
};

const setTrendingDevs = (payload) => {
  return {
    type: "SET_TRENDING_DEVS",
    payload,
  };
};

export { setTrendingTags, setTrendingDevs };
