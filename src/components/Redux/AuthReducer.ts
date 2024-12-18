import { Dispatch, Action } from "redux";
import { authApi, ResultCodeEnum, securityApi } from "../../api/api";
import { AppStateType } from "./Redux-store";
import { ThunkAction } from "redux-thunk";

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
type ActionType =
  | resetAuthDataCAType
  | SetAuthUserDataActionType
  | getCaptchaUrlSuccessActionCreatorType;

const authReducer = (
  state = initialState,
  action: ActionType
): InitialSateType => {
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

type DispatchType = Dispatch<ActionType>;
type GetStateType = () => AppStateType;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  Action<string>
>;

export const getAuthUserData =
  (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let meData = await authApi.getMe();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let { id, email, login } = meData.data;
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
  ): ThunkType =>
  async (dispatch) => {
    try {
      const formattedCaptcha = captcha !== undefined ? captcha : null;

      const loginData = await authApi.login(
        email,
        password,
        rememberMe,
        formattedCaptcha as null
      );
      if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
        setStatus(null);
      } else {
        if (loginData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
          dispatch(getCaptchaUrl());
        }
        const errorMessage =
          loginData.messages.length > 0
            ? loginData.messages[0]
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

export const getCaptchaUrl =
  (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    try {
      const response = await securityApi.getCaptcha();
      const captchaUrl = response.data.url;
      dispatch(getCaptchaUrlSuccess(captchaUrl));
    } catch (error) {
      console.error("Failed to fetch CAPTCHA URL:", error);
    }
  };

export const logout =
  (): ThunkType => async (dispatch: DispatchType, getState: GetStateType) => {
    let response = await authApi.logout();
    if (response.data.resultCode === 0) {
      dispatch(resetAuthDataCA());
    }
  };

export default authReducer;
