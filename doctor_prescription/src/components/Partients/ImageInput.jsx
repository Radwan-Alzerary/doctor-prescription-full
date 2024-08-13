import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ReactModal from "react-modal";

function ImageInput(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 100, height: 100 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [fileToCrop, setFileToCrop] = useState(null);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (showCameraModal) {
      const startStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
      startStream();
    }
  }, [showCameraModal]);

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
    handleFileChange(file);
  };

  const handleFileChange = (file) => {
    if (file) {
      if (props.crop) {
        setFileToCrop(file);
        displayPreview(file);
        setShowCropModal(true);
      } else {
        displayPreview(file);
        props.handleFileChange(file, props.index);
      }
    }
  };

  const handleScannerCapture = () => {
    props.handleScannerHandle();
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  };

  const handleCameraCapture = () => {
    setShowCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCaptureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      handleFileChange(
        new File([blob], "camera_capture.jpg", { type: blob.type })
      );
    });
    handleCloseCameraModal();
  };

  const getCroppedImg = async (image, crop) => {
    if (!crop || !image) {
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = "cropped.jpg";
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleSaveCroppedImage = async () => {
    const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
    const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
    setImgSrc(croppedImageUrl);
    props.handleFileChange(croppedImageBlob, props.index);
    setShowCropModal(false);
  };

  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
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
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        {!imgSrc ? (
          <div className="text-center">
            <img
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt=""
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <span>رفع صورة للمريض</span>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG، JPG، GIF بحد أقصى 10 ميجابايت
            </p>
          </div>
        ) : (
          ""
        )}
        {imgSrc && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src={imgSrc}
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
        {!imgSrc ? (
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
        {imgSrc && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src={imgSrc}
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
        onClick={()=>{handleScannerCapture()}}
      >
        {!imgSrc ? (
          <div className="text-center">
            <img
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/528885/camera-square.svg"
              alt=""
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <span>عمل سكان</span>
            </h3>
          </div>
        ) : (
          ""
        )}
        {imgSrc && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src={imgSrc}
              className="mx-auto max-h-full"
              id="preview"
              alt="Preview"
            />
          </div>
        )}
      </div>

      {showCameraModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      تحضير الكاميرا
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        يمكنك مشاهدة بث الفيديو الحي من الكاميرا قبل التقاط
                        الصورة.
                      </p>
                      <video
                        ref={videoRef}
                        className="w-full h-auto"
                        autoPlay
                        muted
                        playsInline
                      ></video>
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCaptureImage}
                      >
                        التقاط الصورة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseCameraModal}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCropModal && props.crop && (
        <ReactModal
          isOpen={showCropModal}
          onRequestClose={() => setShowCropModal(false)}
          contentLabel="Crop Image"
          className="fixed inset-0 flex h-52  top-96 items-center justify-center z-50 p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
        >
          <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <ReactCrop
                src={imgSrc}
                crop={crop}
                onImageLoaded={(img) => (imgRef.current = img)}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                className="w-full"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(1) rotate(0deg)` }}
                  onLoad={onImageLoad}
                  className=" h-96"
                />
              </ReactCrop>
            </div>
            <div className="flex justify-center items-center p-2 w-full rounded-b-lg">
              <button
                onClick={handleSaveCroppedImage}
                className="save-button mr-2 bg-blue-500 text-white px-12 py-2 rounded"
              >
                حفظ
              </button>
              <button
                onClick={() => setShowCropModal(false)}
                className="cancel-button bg-red-500 text-white px-12 py-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        </ReactModal>
      )}
    </>
  );
}

export default ImageInput;
