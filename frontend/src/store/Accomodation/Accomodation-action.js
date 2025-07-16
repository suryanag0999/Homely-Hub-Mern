import { axiosInstance } from "../../components/utils/axios";
import { accomodationActions } from "./Accomodation-slice";

export const createAccomodation = (accomodationData) => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    const response = await axiosInstance.post(
      "/api/v1/rent/user/newAccomodation",
      accomodationData
    );
    if (!response) throw new Error("could't get any accomodation");
  } catch (error) {
    dispatch(accomodationActions.getErrors(error.response.data.message));
  }
};

export const getAllAccomodation = () => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    const { data } = await axiosInstance.get(
      "/api/v1/rent/user/myAccomodation"
    );
    const accom = data.data;
    console.log(accom);

    dispatch(accomodationActions.getAccomodation(accom));
  } catch (error) {
    dispatch(accomodationActions.getErrors(error.response.data.message));
  }
};
