import React, { useState } from 'react'
import { Trash2, Edit, Calendar } from 'lucide-react'

const MedicalReportCard = ({ report, onDelete, onEdit }) => {
  const createdAt = new Date(report.createdAt)
  const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')} ${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(report._id)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
            aria-label="Edit report"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(report._id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
            aria-label="Delete report"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">التقرير</h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: report.report }}
        />
      </div>
    </div>
  )
}

const MedicalReportCards = ({ medicalReportData, handleReportDelete, handleReportEdit }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = medicalReportData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        {currentItems.map((report) => (
          <MedicalReportCard
            key={report._id}
            report={report}
            onDelete={handleReportDelete}
            onEdit={handleReportEdit}
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
          {Array.from({ length: Math.ceil(medicalReportData.length / itemsPerPage) }, (_, i) => (
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

export default MedicalReportCards