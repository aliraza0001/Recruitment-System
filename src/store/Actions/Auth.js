import { Alert } from "react-native";
import Auth from "../../services/Auth";
import { AuthState } from "../type";

export const SignUp = (name, email, password, userType) => {
  return async (dispatch) => {
    dispatch({ type: AuthState, payload: { loading: true } });
    try {
      const { user } = await Auth.register(email, password);
      console.log(user, "User");
      if (user?.uid) {
        const data = { name, email, userType, uid: user?.uid };
        await Auth.createUser(userType, user?.uid, data);
        dispatch({
          type: AuthState,
          payload: { loading: false, signUp: true },
        });
      } else dispatch({ type: AuthState, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: AuthState, payload: { loading: false } });
      alert(error?.message);
    }
  };
};

export const Login = (email, password, userType) => {
  return async (dispatch) => {
    console.log("email, password, userType", email, password, userType);
    dispatch({ type: AuthState, payload: { loading: true } });
    try {
      const { user } = await Auth.signin(email, password);
      console.log(user, "User");
      if (user?.uid) {
        const response = await Auth.getUser(user?.uid, userType);
        console.log("user----> ", response);
        if (response) {
          dispatch({
            type: AuthState,
            payload: { loading: false, isLogin: true, user: response },
          });
        } else {
          dispatch({ type: AuthState, payload: { loading: false } });
          await Auth.Logout();
          Alert.alert("User type is incorrect");
        }
      } else dispatch({ type: AuthState, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: AuthState, payload: { loading: false } });
      alert(error?.message);
    }
  };
};
