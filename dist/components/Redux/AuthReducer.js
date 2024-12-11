"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCaptchaUrl = exports.login = exports.getAuthUserData = exports.getCaptchaUrlSuccess = exports.setAuthUserData = void 0;
const api_1 = require("../../api/api");
const SET_USER_DATA = "SET_USER_DATA";
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null then thr capthcha is not required
};
const authReducer = (state = initialState, action) => {
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
const resetAuthDataCA = () => {
    return { type: RESET_USER_AUTH_DATA };
};
const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth }
});
exports.setAuthUserData = setAuthUserData;
const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});
exports.getCaptchaUrlSuccess = getCaptchaUrlSuccess;
const getAuthUserData = () => async (dispatch) => {
    let response = await api_1.authApi.getMe();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch((0, exports.setAuthUserData)(id, email, login, true));
    }
};
exports.getAuthUserData = getAuthUserData;
const login = (email, password, rememberMe, setSubmitting, setStatus, captcha) => async (dispatch) => {
    try {
        const formattedCaptcha = captcha !== undefined ? captcha : null;
        const response = await api_1.authApi.login(email, password, rememberMe, formattedCaptcha);
        if (response.data.resultCode === 0) {
            dispatch((0, exports.getAuthUserData)());
            setStatus(null);
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch((0, exports.getCaptchaUrl)());
            }
            const errorMessage = response.data.messages.length > 0
                ? response.data.messages[0]
                : "An error occurred. Please try again.";
            setStatus(errorMessage);
        }
    }
    catch (error) {
        console.error("Login error:", error);
        setStatus("An unexpected error occurred. Please try again.");
    }
    finally {
        setSubmitting(false);
    }
};
exports.login = login;
const getCaptchaUrl = () => async (dispatch) => {
    try {
        const response = await api_1.securityApi.getCaptcha();
        const captchaUrl = response.data.url;
        dispatch((0, exports.getCaptchaUrlSuccess)(captchaUrl));
    }
    catch (error) {
        console.error("Failed to fetch CAPTCHA URL:", error);
    }
};
exports.getCaptchaUrl = getCaptchaUrl;
const logout = () => async (dispatch) => {
    let response = await api_1.authApi.logout();
    if (response.data.resultCode === 0) {
        dispatch(resetAuthDataCA());
    }
};
exports.logout = logout;
exports.default = authReducer;
