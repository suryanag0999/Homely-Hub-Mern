import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    bookingDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    sendBookingRequest(state) {
      state.loading = true;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload.bookings;
    },
  },
});

export const {
  setBookings,
  addBooking,
  setBookingDetails,
  sendBookingRequest,
} = bookingSlice.actions;

export default bookingSlice;
