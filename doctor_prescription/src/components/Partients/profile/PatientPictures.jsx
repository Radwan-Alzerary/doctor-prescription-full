import React, { useState } from 'react'
import { Trash2, Upload, Camera } from 'lucide-react'
import ImageInput from "../ImageInput";
import AdvancedImageView from './AdvancedImageView';


const ImageView = ({ imageUrl, handleHideImage }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
      <img src={imageUrl} alt="Full size" className="max-w-full h-auto" />
      <button
        onClick={handleHideImage}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Close
      </button>
    </div>
  </div>
)

export default function PatientPictures({ images, id, refreshPaitent, handleScannerHandle, onImageDeleteHandle }) {
  const [showImage, setShowImage] = useState(false)
  const [imageSelector, setImageSelector] = useState('')
  const serverAddress = window.location.origin.replace(/:\d+/, ':5000')

  const handleFileChange = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)
    formData.append('id', id)

    try {
      const response = await fetch(`${serverAddress}/patients/galaryimage/`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        refreshPaitent()
      } else {
        console.error('Error uploading image')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleImageView = (imageUrl) => {
    setShowImage(true)
    setImageSelector(imageUrl)
  }

  const handleHideImage = () => {
    setShowImage(false)
  }

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((value, index) => (
          <div key={index} className="relative group">
            <img
              src={`${serverAddress}/${value}`}
              alt={`Patient image ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg cursor-pointer transition-transform duration-200 transform group-hover:scale-105"
              onClick={() => handleImageView(`${serverAddress}/${value}`)}
            />
            <button
              onClick={() => onImageDeleteHandle(value)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Delete image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <ImageInput handleFileChange={handleFileChange} handleScannerHandle={handleScannerHandle} />
      </div>
      {showImage && (
        <AdvancedImageView
        imageUrl={imageSelector}
        handleHideImage={handleHideImage}
        onSave={(editedImage) => {
          console.log('Saving edited image:', editedImage)
          // Implement your save logic here
          handleHideImage()
        }}
      />
      )}
    </div>
  )
}