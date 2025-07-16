import React, { useState } from "react";
import Modal from "./Modal";

const PropertyImg = ({ images = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="property-img-container">
        <div className="img-item">
          <img
            className="images"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            src={images[0].url}
            alt="houses"
          />
        </div>
        {images.slice(1,4).map((image,index)=>(
          <div key={index}>
            <img src={image.url} 
            alt= {`property-img-${index+2}`}
            className="images"
            />
          </div>
        ))}
        <div>
          <img
            className="images"
            style={{ borderBottomRightRadius: "10px" }}
            src={images[5].url}
            alt="property-img-5"
          />
          <button className=" similar-photos" onClick={handleShowAllPhotos}>
            <span className="material-symbols-outlined">photo_library</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          images={images
          }
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default PropertyImg;
