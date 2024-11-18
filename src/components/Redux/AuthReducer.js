import { authApi } from "../../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
    case RESET_USER_AUTH_DATA:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

const resetAuthDataCA = () => {
  return { type: RESET_USER_AUTH_DATA };
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getAuthUserData = (userId, email, login) => (dispatch) => {
  return authApi.getMe(userId, email, login).then((response) => {
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const login =
  (email, password, rememberMe, setSubmitting, setStatus) => (dispatch) => {
    authApi
      .login(email, password, rememberMe)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(getAuthUserData());
          setStatus(null);
        } else {
          // Display the first message from the server response
          const errorMessage =
            response.data.messages.length > 0
              ? response.data.messages[0]
              : "An error occurred. Please try again.";
          setStatus(errorMessage); // Set the error message to Formik's status
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        console.error("Login error:", error);
        setStatus("An unexpected error occurred. Please try again.");
      })
      .finally(() => {
        setSubmitting(false); // Stop the submission spinner
      });
  };

export const logout = () => (dispatch) => {
  authApi.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(resetAuthDataCA());
    }
  });
};

export default authReducer;
