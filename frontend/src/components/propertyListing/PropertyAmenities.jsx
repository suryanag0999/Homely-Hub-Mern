import React from "react";


const PropertyAmenities = ({ amenities = [] }) => {
  return (
    <>
    <h2 className="property-amenities">What this place offers</h2>
      <div className="amenities">
        {amenities.map((amenity) => (
          <p key={amenity._id}>
            <span className="material-symbols-outlined">
              {amenity.icon || "check_circle"}
            </span>
            <span>{amenity.name}</span>
          </p>
        ))}
      </div>
    </>
  );
};

export default PropertyAmenities;




      // <h2 className="property-amenities">What this place offers</h2>
      // <div className="amenities">
      //   {amenities.map((amenity) => (
      //     <p key={amenity._id}>
      //       <span className="material-symbols-outlined">
      //         {amenity.icon || "check_circle"}
      //       </span>
      //       <span>{amenity.name}</span>
      //     </p>
      //   ))}
      // </div>