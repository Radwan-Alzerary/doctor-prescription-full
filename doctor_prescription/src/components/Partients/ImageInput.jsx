import React from "react";
import { useState } from "react";

function ImageInput(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    props.handleFileChange(file)

    displayPreview(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    props.handleFileChange(file)
    console.log(e.target.files[0])
    displayPreview(file);
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
  };

  return (
    <div
      className={`w-full h-[160px] relative border-2 border-gray-300 bg-white border-dashed rounded-lg p-6 cursor-pointer ${
        isDragging ? "border-indigo-600" : ""
      }`}
      id="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={handleFileChange}
      />
      {!previewSrc ? (
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>رفع صورة للمريض</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      ) : (
        ""
      )}
      {previewSrc && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src={previewSrc}
            className=" mx-auto max-h-full"
            id="preview"
            alt="Preview"
          />
        </div>
      )}
    </div>
  );
}

export default ImageInput;
