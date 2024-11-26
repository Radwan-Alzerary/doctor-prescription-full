import React from 'react'
import { ChevronRight, Trash2, Edit2, AlertCircle, DollarSign } from 'lucide-react'

const VisitReportTable = ({ visitData, onVisitDeleteHandel, onVisitEditHandel }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'normal':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'dangers':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {visitData.map((visit) => (
        <div key={visit._id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  {new Date(visit.createdAt).toLocaleString()}
                </span>
                {!visit.paymentVisit && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(visit.priority)}`}>
                    {visit.priority}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onVisitEditHandel(visit._id,visit.paymentVisit)}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onVisitDeleteHandel(visit._id)}
                  className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {!visit.paymentVisit ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{visit.CauseOfVisite}</h3>
                <p className="text-sm text-gray-600 mb-4">{visit.chiefComplaint}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">الفحص السريري:</span> {visit.investigation}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">التشخيص:</span> {visit.diagnosis}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">الادارية:</span> {visit.management}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <DollarSign size={24} className="text-green-600" />
                <div className="text-lg font-medium text-gray-900">{visit.SessionPrice}</div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6">
            <button
              onClick={() => onVisitEditHandel(visit._id,visit.paymentVisit)}
              className="flex items-center justify-center w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              عرض التفاصيل الكاملة
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VisitReportTable
