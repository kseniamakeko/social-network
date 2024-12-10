import { getAuthUserData } from "./AuthReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: null as boolean | null
};

export type initialSateType = typeof initialState;

const appReducer = (state = initialState, action: any): initialSateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

type initializedSuccessActionCreatorType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): initializedSuccessActionCreatorType => ({
  type: INITIALIZED_SUCCESS
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
