import {
  setBookings,
  // addBooking,
  setBookingDetails,
  sendBookingRequest,
} from "./booking-slice";
import { axiosInstance } from "../../components/utils/axios";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/rent/user/booking/${bookingId}`
    );
    dispatch(setBookingDetails(response.data.data));
  } catch (error) {
    console.error("Error fetching booking details", error.message);
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  try {
    dispatch(sendBookingRequest());
    const response = await axiosInstance.get("/api/v1/rent/user/booking");
    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    console.error("Failed to fetch the user bookings", error.message);
  }
};
