import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails } from "../../store/payment/payment-slice";

const PaymentForm = ({
  propertyId,
  price,
  propertyName,
  address,
  maximumGuest,
  currentBookings,
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disabledDates = currentBookings.map((dates) => ({
    start: new Date(dates.fromDate),
    end: new Date(new Date(dates.toDate).setHours(23, 59, 59, 999)),
  }));

  const isDateDisabled = (current) => {
    return (
      current.isBefore(moment(), "day") ||
      disabledDates.some(
        ({ start, end }) => current.toDate() >= start && current.toDate() <= end
      )
    );
  };

  const form = useForm({
    defaultValues: {
      dateRange: [],
      guests: "",
      name: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      const [checkinDate, checkoutDate] = value.dateRange;
      const nights = Math.max(
        moment(checkoutDate, "YYYY-MM-DD").diff(
          moment(checkinDate, "YYYY-MM-DD"),
          "days"
        ),
        1
      );

      const { name, guests, phoneNumber } = value;
      if (name && guests && phoneNumber && checkinDate && checkoutDate) {
        await dispatch(
          setPaymentDetails({
            checkinDate,
            checkoutDate,
            nights,
            totalPrice: calculatedPrice,
            propertyName,
            address,
            guests,
          })
        );
        navigate(`/payment/${propertyId}`);
      } else {
        alert("Please fill all the fields correctly before proceeding");
      }
    },
  });

  return (
    <div className="form-container">
      <form
        className="payment-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit().catch(() => {});
        }}
      >
        <div className="price-pernight">
          Price: <b>&#8377;{price}</b>
          <span> / Per night</span>
        </div>

        <div className="payment-field">
          <form.Field name="dateRange">
            {(field) => (
              <div className="date">
                <Space direction="vertical" size={12}>
                  <RangePicker
                    format="YYYY-MM-DD"
                    disabledDate={isDateDisabled}
                    onChange={(value, dateString) => {
                      field.handleChange(dateString);
                      const [checkin, checkout] = dateString;
                      if (checkin && checkout) {
                        const nights = Math.max(
                          moment(checkout, "YYYY-MM-DD").diff(
                            moment(checkin, "YYYY-MM-DD"),
                            "days"
                          ),
                          1
                        );
                        setCalculatedPrice(price * nights);
                      } else {
                        setCalculatedPrice(0);
                      }
                    }}
                  />
                </Space>
              </div>
            )}
          </form.Field>

          <form.Field
            name="guests"
            validators={{
              onChange: ({ value }) =>
                value > 0 && value <= maximumGuest
                  ? undefined
                  : `Guests must be between 1 and ${maximumGuest}`,
            }}
          >
            {(field) => (
              <div className="guest">
                <label className="payment-labels">Number of guests:</label>
                <input
                  type="number"
                  className="no-of-guest"
                  placeholder="Guest"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <p style={{ color: "red" }}>{field.state.meta.errors}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => (
              <>
                <label className="payment-labels">Your Full Name</label>
                <input
                  type="text"
                  className="full-name"
                  placeholder="Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </form.Field>

          <form.Field name="phoneNumber">
            {(field) => (
              <>
                <label className="payment-labels">Phone Number:</label>
                <input
                  type="tel"
                  className="phone-number"
                  placeholder="Number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </form.Field>
        </div>

        <div className="book-place">
          {!isAuthenticated ? (
            <Link to="/login" className="login-button-link">
              <button className="login-button">Login to Book</button>
            </Link>
          ) : (
            <button type="submit">
              Book this place &#8377;{" "}
              {calculatedPrice > 0 ? calculatedPrice : `${price} per night`}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
