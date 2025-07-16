import React, { useState } from "react";
import { Trash2, Upload } from "lucide-react";

const ImagesUploading = ({ field }) => {
  const [imageInput, setImageInput] = useState("");

  const handleImageInputChange = (event) => {
    setImageInput(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImage = {
          public_id: `file_${Date.now()}`,
          url: e.target.result,
        };
        field.handleChange([...field.state.value, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (imageInput) {
      const newImage = {
        public_id: `url_${Date.now()}`,
        url: imageInput,
      };
      field.handleChange([...field.state.value, newImage]);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...field.state.value];
    updatedImages.splice(index, 1);
    field.handleChange(updatedImages);
  };

  return (
    <div className="photos-container">
      <h4 className="photos-header">Photos</h4>
      <label className="form-labels">Upload images of your property</label>
      <div className="image-link-container">
        <input
          className="image-link"
          type="text"
          placeholder="Add using link/.jpg"
          onChange={handleImageInputChange}
          value={imageInput}
        />
        <button className="add-button" type="button" onClick={handleAddImage}>
          Add
        </button>
      </div>
      <div className="image-list-container">
        {field.state.value.map((imageObj, index) => (
          <div className="image-preview-box" key={imageObj.public_id}>
            <img
              src={imageObj.url}
              alt={`Image-${index}`}
              className="preview-image"
              height={"200px"}
              width={"200px"}
            />
            <button
              type="button"
              className="delete-btn"
              onClick={() => handleDeleteImage(index)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <label className="upload">
          <input
            type="file"
            accept="image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
          <Upload size={16} />
          Upload Photo
        </label>
      </div>
    </div>
  );
};

export default ImagesUploading;
