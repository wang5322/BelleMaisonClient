import React, { useState } from "react";
import "./UploadImage.css";

const UploadImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      console.log("file:", file);
      console.log("reader.result:", reader.result);
      console.log("fileName", file.name);
      reader.onload = () => {
        setImageSrc(reader.result);
        setImageName(file.name);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeUpload = () => {
    setImageSrc(null);
    setImageName("");
  };

  const handleDragOver = () => {
    // Add your dragover logic here
  };

  const handleDragLeave = () => {
    // Add your dragleave logic here
  };

  return (
    <div className="file-upload">
      <button
        className="file-upload-btn"
        type="button"
        onClick={() => document.querySelector(".file-upload-input").click()}
      >
        Add Image
      </button>

      <div
        className="image-upload-wrap"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          className="file-upload-input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="drag-text">
          <h3>Drag and drop a file or select add Image</h3>
        </div>
      </div>
      <div className="file-upload-content">
        {imageSrc && (
          <>
            <img
              className="file-upload-image"
              src={imageSrc}
              alt="this is an upload"
            />
            <div className="image-title-wrap">
              <button
                type="button"
                onClick={removeUpload}
                className="remove-image"
              >
                Remove <span className="image-title">{imageName}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
