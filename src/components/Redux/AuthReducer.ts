import { authApi, securityApi } from "../../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null // if null then thr capthcha is not required
};

export type InitialSateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialSateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
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

const resetAuthDataCA = (): resetAuthDataCAType => {
  return { type: RESET_USER_AUTH_DATA };
};
type resetAuthDataCAType = {
  type: typeof RESET_USER_AUTH_DATA;
};

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): getCaptchaUrlSuccessActionCreatorType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl }
});
type getCaptchaUrlSuccessActionCreatorType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authApi.getMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    setSubmitting: (isSubmitting: boolean) => void,
    setStatus: (status: string | null) => void,
    captcha?: string
  ) =>
  async (dispatch: any) => {
    try {
      const formattedCaptcha = captcha !== undefined ? captcha : null;

      const response = await authApi.login(
        email,
        password,
        rememberMe,
        formattedCaptcha as null | undefined
      );
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
        setStatus(null);
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrl());
        }
        const errorMessage =
          response.data.messages.length > 0
            ? response.data.messages[0]
            : "An error occurred. Please try again.";
        setStatus(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
export const getCaptchaUrl = () => async (dispatch: any) => {
  try {
    const response = await securityApi.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  } catch (error) {
    console.error("Failed to fetch CAPTCHA URL:", error);
  }
};

export const logout = () => async (dispatch: any) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(resetAuthDataCA());
  }
};

export default authReducer;
