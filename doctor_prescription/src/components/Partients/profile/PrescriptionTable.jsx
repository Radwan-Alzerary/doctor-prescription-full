import React, { useState } from 'react'
import { Trash2, Edit, Calendar, Stethoscope, Pill } from 'lucide-react'

const PrescriptionCard = ({ prescription, onDelete, onEdit }) => {
  const createdAt = new Date(prescription.createdAt)
  const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')} ${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(prescription._id)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
            aria-label="Edit prescription"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(prescription._id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
            aria-label="Delete prescription"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center text-gray-800 mb-2">
          <Stethoscope className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">التشخيص</h3>
        </div>
        <p className="text-gray-600 ml-7">{prescription.MedicalDiagnosis}</p>
      </div>
      <div>
        <div className="flex items-center text-gray-800 mb-2">
          <Pill className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">الادوية</h3>
        </div>
        <ul className="list-disc list-inside text-gray-600 ml-7">
          {Array.isArray(prescription.pharmaceutical)
            ? prescription.pharmaceutical.map((item, index) => (
                <li key={index}>{item && item.id && item.id.name ? item.id.name : 'غير معروف'}</li>
              ))
            : <li>غير معروف</li>
          }
        </ul>
      </div>
    </div>
  )
}

const PrescriptionCards = ({ prescriptionData, partientsProfileId, onPrescriptionDeleteHande, onPrescriptionEditHandel }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = prescriptionData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        {currentItems.map((prescription) => (
          <PrescriptionCard
            key={prescription._id}
            prescription={prescription}
            onDelete={() => onPrescriptionDeleteHande(partientsProfileId, prescription._id)}
            onEdit={() => onPrescriptionEditHandel(partientsProfileId, prescription._id)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-2">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: Math.ceil(prescriptionData.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrescriptionCards