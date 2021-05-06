const apis = {
    BASE_LOCAL_URL: "http://localhost:3000",
    BASE_SERVER_URL: "https://tik1thb504.execute-api.us-west-2.amazonaws.com/dev",

    CREATE_USER: "/user", // POST REQUEST
    UPDATE_USER: "/user", // PUT REQUEST
    DELETE_USER: "/user", // DELETE REQUEST
    GET_USER_BY_USER_ID: "/user/get-user-by-user-id", // POST REQUEST
    GET_USER_BY_USER_NAME: "/user/", // /user/{username}  -- GET REQUEST
    GET_TOP_REPUTED_USERS: "/user/top-reputed-users", // /{limit}/{last-evaluated-key}  -- GET REQUEST
    FOLLOW_USER_IN_BULK: "/user/follow-user-in-bulk", // POST REQUEST
    GET_USER_PREVIOUS_VOTES: "/user/get-user-previous-votes", //POST REQUEST

    GET_POPULAR_TAGS: "/tag/popular-tags", // /{limit}/{last-evaluated-key} -- GET REQUEST 
    GET_TAG: "/tag/", // /tag/{tag-name} -- GET REQUEST
    FOLLOW_TAG: "/tag/follow", // POST REQUEST
    UNFOLLOW_TAG: "/tag/unfollow", // POST REQUEST
    FOLLOW_TAG_IN_BULK: "/tag/follow-tag-in-bulk", // POST REQUEST
    
    CREATE_POST: "/post", // POST REQUEST
    UPDATE_POST: "/post", // PUT REQUEST
    DELETE_POST: "/post", // DELETE REQUEST
    GET_ALL_QUESTIONS: "/post/get-all/question", // GET REQUEST
    GET_ALL_BLOGS: "/post/get-all/blog", // GET REQUEST
    GET_PERSONALIZED_QUESTIONS: "/post/get-personalized-posts/question", // GET REQUEST
    GET_PERSONALIZED_BLOGS: "/post/get-personalized-posts/blog", // POST REQUEST
    VOTE_POST: "/post/vote-post", //POST requests


    S3_GET_PRESIGNED_URL: "/s3upload/get-signed-url" // POST REQUEST GET PRESIGNED URL
};

export default apis;
