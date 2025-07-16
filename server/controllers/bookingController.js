import Razorpay from "razorpay";
import { Property } from "../models/propertyModel.js";
import { Booking } from "../models/bookingModel.js";
import crypto from "crypto";
import moment from "moment";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
});

//step1
const getCheckOutSession = async(req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({
                status:"fail",
                message:"please login first",
            });
        }
        const {amount,currency,propertyId,fromDate,toDate,guests}=req.body;
        //validate dates and avalibity 
        const property = await Property.findById(propertyId);
        if(!property){
            return res.status(404).json({
                status:"fail",
                message:"property not found",
            });
        }

        //check Avalibity 
        const isBooked = property.currentBookings.some((booking) => {
    return (
        (new Date(booking.fromDate) <= new Date(fromDate) && new Date(fromDate) <= new Date(booking.toDate)) ||
        (new Date(booking.fromDate) <= new Date(toDate) && new Date(toDate) <= new Date(booking.toDate))
         );
    });

    if (isBooked) {
    return res.status(400).json({
        status: "fail",
        message: "Property is already booked for the selected dates",
    });
   }

   const options = {
    amount: amount *100,
    currency:currency || "INR",
    receipt : `booking_${Date.now()}_${req.user.name}`,
    notes:{
        propertyId,
        propertyName:property.propertyName,
        userId:req.user._id.toString(),
        fromDate,
        toDate,
        guests:guests.toString(),
    },
   };
   console.log(options);


   const order = await razorpay.orders.create(options);
   console.log("orders", order);

   res.status(200).json({
    success:true,
    orderId:order.id,
    amount:order.amount,
    currency:order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
    propertyName:property.name,
   });
    } catch (error) {
        console.log("checkout session error", error);
        res.status(500).json({
            success:false,
            message:"failed to create razorpay order",
            error:error.message,
        })
        
    }
};

// step2 verify payment n booking 

const verifyPaymentAndCreatebooking = async(req,res)=>{
    try {
        const {razorpayData,bookingDetails}=req.body;
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = razorpayData;

        // verify payment signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac
        ("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
        console.log(expectedSignature)
        console.log(razorpay_signature)

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({
        status:"fail",
        message:"payment verfication failed",
    });
    }
    const payment = await  razorpay.payments.fetch(razorpay_payment_id);
    if(payment.status !== "captured"){
        return res.status(400).json({
            status:"fail",
            message:"payment not completed",
        });
    }
    console.log("booking", bookingDetails);

// extract booking from payment notes or request body
const {propertyId,fromDate,toDate,guests,totalAmount}=
bookingDetails;
const fromDateMoment = moment(fromDate);
const toDateMoment = moment(toDate);
const numberOfnights = toDateMoment.diff(fromDateMoment,"days");

// create booking with payment details

const booking = await Booking.create({
    property:propertyId,
    price:totalAmount,
    guests,
    fromDate,
    toDate,
    numberOfnights,
    user:req.user._id,
    paymentStatus:"completed",
    razorpayOrderId: razorpay_order_id,
    razorpaypaymentid:razorpay_payment_id,
    razorpaysignature:razorpay_signature,
    paidAt: new Date(),
});

const updateProperty = await Property.findByIdAndUpdate(
    propertyId,
    {
        $push:{
            currentBookings:{
                bookingId:booking._id,
                fromDate,
                toDate,
                userId:req.user._id,
            },
        },
    },{new:true}
);
   res.status(200).json({
    status:"success",
    message: "booking create successfully",
    data:{
        booking,
        paymentId:razorpay_payment_id,
    },
   });
    } catch (error) {
        console.error("booking created", error);
        res.status(500).json({
            status:"fail",
            message:"failed to create booking",
            error: error.message,
        });
    }
};
const getUserBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find({user: req.user._id});
        console.log("booking", bookings);

        res.status(200).json({
            status: "success",
            data:{
                bookings,
            },
        });
    } catch (error) {
        console.error("failed to get user booking", error.message)

         res.status(400).json({
            status: "fail",
            message:error.message,
        });
    }
};


const getBookingDetails = async(req,res)=>{
    try {
        const bookings = await Booking.findById(req.params.bookingId);
        res.status(200).json({
            status:"success",
            data:{
                bookings,
            },
        })
    } catch (error) {
         res.status(401).json({
            status:"fail",
           message:error.message,
        });
        
    }
};

export {
    getBookingDetails,
    getCheckOutSession,
    getUserBookings,
    verifyPaymentAndCreatebooking,
}   