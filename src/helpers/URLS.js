let URLPath = {
  SECURITY: {
    LOGIN: {
      URI: "auth/login",
      METHOD: "POST",
    },
    LOGOUT: {
      URI: "auth/logout",
      METHOD: "POST",
    },
    ME: {
      URI: "users/me",
      METHOD: "GET",
    },
    REFRESH: {
      URI: "auth/refresh_token",
      METHOD: "POST",
    },
  },
  USER: {
    LIST: "/users",
    CREATE: {
      URI: "/users",
      METHOD: "POST",
    },
    EDIT: {
      URI: "/users/{USER_ID}",
      METHOD: "PUT",
    },
    PASSWORD: {
      URI: "/users/change-password",
      METHOD: "PUT",
    },
  },
};

export default URLPath;
