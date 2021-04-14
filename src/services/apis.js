const apis = {
    BASE_LOCAL_URL: "http://localhost:3000",
    BASE_SERVER_URL: "https://tik1thb504.execute-api.us-west-2.amazonaws.com/dev",

    CREATE_USER: "/user", // POST REQUEST
    UPDATE_USER: "/user", // PUT REQUEST
    DELETE_USER: "/user", // DELETE REQUEST
    GET_USER_BY_USER_ID: "/user/get-user-by-user-id", // POST REQUEST
    GET_USER_BY_USER_NAME: "/user", // /user/{username}  -- GET REQUEST

    GET_POPULAR_TAGS: "/tag/popular/all", // GET REQUEST
    GET_TAG: "/tag", // /tag/{tag-name} -- GET REQUEST
    FOLLOW_TAG: "/tag/follow", // POST REQUEST
    UNFOLLOW_TAG: "/tag/unfollow", // POST REQUEST
};

export default apis;
