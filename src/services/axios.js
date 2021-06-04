import axios from "axios";
import apis from "./apis";

const http = axios.create({
  baseURL: apis.BASE_SERVER_URL,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    console.log("this is err from axios", error);
    if (
      error.response.status === 401 &&
      originalRequest.url === apis.BASE_SERVER_URL + "/token/refresh/"
    ) {
      window.location.href = "/user/login";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          // TODO: instade call the current user details with amplify and replace the token
          return http
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              http.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return http(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/user/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/user/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default http;
