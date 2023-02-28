export const userReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true, userInfo: {} };
    case "LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, error: action.payload, userInfo: {} };
    default:
      return state;
  }
};
