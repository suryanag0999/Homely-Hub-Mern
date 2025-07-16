
import { axiosInstance } from "../../components/utils/axios";
import { userActions } from "./user-slice";
// import Password from "antd/es/input/Password";


export const getSignup = (user)=> async(dispatch) =>{
    try {
        dispatch(userActions.getSignupRequest());
        const{data} = await axiosInstance.post("/api/v1/rent/user/signup",user);
        dispatch(userActions.getSignupDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/api/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const CurrentUser = ()=> async(dispatch)=>{
    try {
        dispatch(userActions.getCurrentUserRequest());
        const {data} = await axiosInstance.get("/api/v1/rent/user/me");
        console.log(data)
        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
        
    }
};

export const updateUser = (updateUser) => async (dispatch)=>{
    try {
        dispatch(userActions.getUpdateUserRequest());
        await axiosInstance.patch("/api/v1/rent/user/updateMe",updateUser);
        const {data} = await axiosInstance.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
        
    }

}

export const forgetPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/api/v1/rent/user/forgotPassword", { email });
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const resetPassword = (rePasswords,token) => async (dispatch) => {
  try {
     await axiosInstance.patch(`/api/v1/rent/user/resetPassword/${token}`, rePasswords);
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/api/v1/rent/user/updateMyPassword", passwords);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/api/v1/rent/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(userActions.getError(error.response.data.message));
  }
};



