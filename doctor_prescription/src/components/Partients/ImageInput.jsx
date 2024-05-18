import React, { useState, useRef, useEffect } from "react";

function ImageInput(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [showCameraModal, setShowCameraModal] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showCameraModal) {
      const startStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920 },
              height: { ideal: 1080 }
            }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
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
    handleFileChange(file, props.index);
  };

  const handleFileChange = (file, index) => {
    if (file) {
      displayPreview(file);
      props.handleFileChange(file, index);
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
    setShowCameraModal(true);
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCaptureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      handleFileChange(new File([blob], "camera_capture.jpg", { type: blob.type }), props.index);
    });
    handleCloseCameraModal();
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
            <p className="mt-1 text-xs text-gray-500">PNG، JPG، GIF بحد أقصى 10 ميجابايت</p>
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">تحضير الكاميرا</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">يمكنك مشاهدة بث الفيديو الحي من الكاميرا قبل التقاط الصورة.</p>
                      <video ref={videoRef} className="w-full h-auto" autoPlay muted playsInline></video>
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
    </>
  );
}

export default ImageInput;
