import React, { useState } from "react";

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
    handleFileChange(file, props.index);
  };

  const handleFileChange = (file, index) => {
    if (file) {
      displayPreview(file);
      props.handleFileChange(file, index);
      console.log(file);
    }
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
  };

  const handleCameraCapture = () => {
    const captureFile = new Promise((resolve, reject) => {
      const handleSuccess = (stream) => {
        const mediaStreamTrack = stream.getTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);

        imageCapture.takePhoto()
          .then(blob => resolve(blob))
          .catch(error => reject(error));
      };

      const handleError = (error) => {
        reject(error);
      };

      navigator.mediaDevices.getUserMedia({ video: true })
        .then(handleSuccess)
        .catch(handleError);
    });

    captureFile.then((blob) => {
      const file = new File([blob], "camera_capture.jpg", { type: blob.type });
      handleFileChange(file, props.index);
      console.log(file);
    }).catch((error) => {
      console.error('Error capturing image:', error);
    });
  };

  return (
    <>
    
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
        accept="image/*"
        capture="environment"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={(e) => handleFileChange(e.target.files[0], props.index)}
      />
      {!previewSrc ? (
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <span>رفع صورة للمريض</span>
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
            className="mx-auto max-h-full"
            id="preview"
            alt="Preview"
          />
        </div>
      )}
    </div>
    <div
      className={`w-full h-[160px] relative border-2 border-gray-300 bg-white border-dashed rounded-lg p-6 cursor-pointer ${
        isDragging ? "border-indigo-600" : ""
      }`}
      id="dropzone"
      onClick={handleCameraCapture}
      >
      {!previewSrc ? (
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/528885/camera-square.svg"
            alt=""
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <span>التقاط صورة للمريض</span>
          </h3>
        </div>
      ) : (
        ""
      )}
      {previewSrc && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src={previewSrc}
            className="mx-auto max-h-full"
            id="preview"
            alt="Preview"
          />
        </div>
      )}
    </div>

    </>
  );
}

export default ImageInput;
