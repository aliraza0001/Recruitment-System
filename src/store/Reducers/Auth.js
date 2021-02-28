import { AuthState, LogOut } from "../type";

const initalState = {
  isLogin: false,
  login: false,
  loading: false,
  signUp: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case AuthState:
      return {
        ...state,
        ...action.payload,
      };
    case LogOut:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
