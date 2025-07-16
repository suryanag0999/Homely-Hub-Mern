import React from "react";

const MyAccomodation = ({ accomodation, loading }) => {
  return (
    <div className="main-container">
      {accomodation.map((property) => (
        <div className="myaccomodation-container row">
          <div className="myaccomodation-image-container col-lg-3 col-md-3">
            <img
              className="myaccomodation-img"
              src={property.images[0].url}
              alt={property.propertyName}
            />
          </div>
          <div className="myaccomodation-information col-lg-9 col-md-9">
            <h6 className="myaccomodation-hotel-name">
              {property.propertyName}
            </h6>
            <div className="stay-information">
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                {property.checkInTime}
              </span>
              <span className="material-symbols-outlined icon">
                arrow_forward
              </span>
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                {property.checkOutTime}
              </span>
            </div>
            <p className="myaccomodation-city">City: {property.address.city}</p>
            <p className="myaccomodation-guest">
              max no of guest: {property.maximumGuest}
            </p>
            <h5 className="myaccomodation-price">
              <span className="material-symbols-outlined">payments</span> Total
              Price :&#8377; {property.price}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAccomodation;
