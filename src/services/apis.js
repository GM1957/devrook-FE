const apis = {
  BASE_LOCAL_URL: "http://localhost:3000",
  BASE_SERVER_URL:
    process.env.NODE_ENV === "production"
      ? "https://eo5z76mcwf.execute-api.ap-south-1.amazonaws.com/prod"
      : "https://tik1thb504.execute-api.us-west-2.amazonaws.com/dev",

  WEB_SOCKET:
    process.env.NODE_ENV === "production"
      ? "wss://3edajuce2i.execute-api.ap-south-1.amazonaws.com/prod"
      : "wss://f5uy9y7ygi.execute-api.us-west-2.amazonaws.com/dev",

  CREATE_USER: "/user", // POST REQUEST
  UPDATE_USER: "/user", // PUT REQUEST
  DELETE_USER: "/user", // DELETE REQUEST
  GET_USER_BY_USER_ID: "/user/get-user-by-user-id", // POST REQUEST
  GET_USER_BY_USER_NAME: "/user/", // /user/{username}  -- GET REQUEST
  GET_TOP_REPUTED_USERS: "/user/top-reputed-users", // /{limit}/{last-evaluated-key}  -- GET REQUEST
  GET_MY_FOLLOWERS: "/user/get-my-followers", // /{user_name}/{limit}/{last-evaluated-key}  -- GET REQUEST
  GET_USERS_I_FOLLOW: "/user/users-i-follow", // /{user_name}/{limit}/{last-evaluated-key}  -- GET REQUEST
  FOLLOW_USER_IN_BULK: "/user/follow-user-in-bulk", // POST REQUEST
  FOLLOW_UNFOLLOW_USER: "/user/follow-unfollow-user", // POST REQUEST
  FOLLOW_CHECKER: "/user/follow-checker", // POST REQUEST
  GET_USER_PREVIOUS_VOTES: "/user/get-user-previous-votes", //POST REQUEST

  CHATTED_WITH_IDS: "/messages/chatted-with-ids", //POST REQUEST
  FULL_CHAT: "/messages/full-chat", //POST REQUEST

  GET_POPULAR_TAGS: "/tag/popular-tags", // /{limit}/{last-evaluated-key} -- GET REQUEST
  DEVS_WHO_FOLLOW_THE_TAG: "/tag/devs-who-follow-the-tag", // {tag_name}/{limit}/{last-evaluated-key} -- GET REQUEST
  GET_TAG: "/tag/", // /tag/{tag-name} -- GET REQUEST
  FOLLOW_TAG: "/tag/follow", // POST REQUEST
  UNFOLLOW_TAG: "/tag/unfollow", // POST REQUEST
  FOLLOW_TAG_IN_BULK: "/tag/follow-tag-in-bulk", // POST REQUEST

  CREATE_POST: "/post", // POST REQUEST
  UPDATE_POST: "/post", // PUT REQUEST
  DELETE_POST: "/post", // DELETE REQUEST
  GET_ALL_QUESTIONS: "/post/get-all/question", // GET REQUEST
  GET_ALL_BLOGS: "/post/get-all/blog", // GET REQUEST
  GET_MAIN_FEED: "/post/get-all/false", // GET REQUEST
  GET_PERSONALIZED_QUESTIONS: "/post/get-personalized-posts/question", // GET REQUEST
  GET_PERSONALIZED_BLOGS: "/post/get-personalized-posts/blog", // POST REQUEST
  GET_PERSONALIZED_MAIN_FEED: "/post/get-personalized-posts/false", // POST REQUEST
  GET_PERSONALIZED_DEV_FEED: "/post/personalized-dev-feed", // POST REQUEST
  GET_PUBLIC_DEV_FEED: "/post/dev-feed-public", // GET REQUEST {fetch_limit}/{last_evaluated_key}
  GET_FULL_POST: "/post/get-full", // GET REQUEST
  VOTE_POST: "/post/vote-post", //POST requests
  TAG_FEED: "/post/tag-feed", // /{limit}/{last-evaluated-key} -- GET REQUEST
  DEV_POSTS: "/post/dev-posts", // /{limit}/{last-evaluated-key} -- GET REQUEST

  GET_ALL_RESPONSES: "/responses/get", //{post_url}/{fetch_limit}/{last_evaluated_key} GET REQUEST
  CREATE_RESPONSE: "/responses/create-response", //POST REQUEST

  SEARCH_POSTS: "/search/post", // GET REQUEST {search_input}/{fetch_limit}/{last_evaluated_key}
  SEARCH_USERS: "/search/user", // GET REQUEST {search_input}/{fetch_limit}/{last_evaluated_key}

  S3_GET_PRESIGNED_URL: "/s3upload/get-signed-url", // POST REQUEST GET PRESIGNED URL
};

export default apis;
