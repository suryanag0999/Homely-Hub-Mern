import express from "express";
import { protect } from "../controllers/authController.js";
import { getBookingDetails, getCheckOutSession, getUserBookings, verifyPaymentAndCreatebooking } from "../controllers/bookingController.js";
const bookingRouter = express.Router();


// get  all the bookings made by user 
bookingRouter.get("/", protect,getUserBookings);

//get details of spefic booking id 
bookingRouter.get("/:bookingId",protect,getBookingDetails);

//create new booking(must be logedin )
bookingRouter.route("/verify-payment")
.post(protect,verifyPaymentAndCreatebooking);

//get razorpay checkout session

bookingRouter.post("/checkout-session", protect,getCheckOutSession);

export{bookingRouter};