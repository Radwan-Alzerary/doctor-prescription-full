import React, { useState } from 'react'
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl'
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Calendar, FileText, Clipboard, TestTube } from 'lucide-react'

const SortableHeader = ({ children, onClick, sorted, direction }) => (
  <th
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
    onClick={onClick}
  >
    <div className="flex items-center">
      {children}
      <span className="ml-2">
        {sorted && (direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
      </span>
    </div>
  </th>
)

const VisitDateTable = ({ visitData }) => {
  const intl = useIntl()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })


  const sortedData = React.useMemo(() => {
    const sortableData = [...visitData]
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [visitData, sortConfig])

  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader
                onClick={() => requestSort('date')}
                sorted={sortConfig.key === 'date'}
                direction={sortConfig.direction}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <FormattedMessage id="Visit Date" />
              </SortableHeader>
              <SortableHeader
                onClick={() => requestSort('visitReportCount')}
                sorted={sortConfig.key === 'visitReportCount'}
                direction={sortConfig.direction}
              >
                <FileText className="w-4 h-4 mr-2" />
                <FormattedMessage id="Visit Reports" />
              </SortableHeader>
              <SortableHeader
                onClick={() => requestSort('prescriptionCount')}
                sorted={sortConfig.key === 'prescriptionCount'}
                direction={sortConfig.direction}
              >
                <Clipboard className="w-4 h-4 mr-2" />
                <FormattedMessage id="Prescriptions" />
              </SortableHeader>
              <SortableHeader
                onClick={() => requestSort('medicalReportsCount')}
                sorted={sortConfig.key === 'medicalReportsCount'}
                direction={sortConfig.direction}
              >
                <FileText className="w-4 h-4 mr-2" />
                <FormattedMessage id="Medical Reports" />
              </SortableHeader>
              <SortableHeader
                onClick={() => requestSort('laboryReportCount')}
                sorted={sortConfig.key === 'laboryReportCount'}
                direction={sortConfig.direction}
              >
                <TestTube className="w-4 h-4 mr-2" />
                <FormattedMessage id="Lab Reports" />
              </SortableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(row.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })
}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.visitReportCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.prescriptionCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.medicalReportsCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.laboryReportCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FormattedMessage id="Previous" />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FormattedMessage id="Next" />
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <FormattedMessage
                id="Showing {start} to {end} of {total} results"
                values={{
                  start: (currentPage - 1) * pageSize + 1,
                  end: Math.min(currentPage * pageSize, sortedData.length),
                  total: sortedData.length,
                }}
              />
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only"><FormattedMessage id="Previous" /></span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only"><FormattedMessage id="Next" /></span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitDateTable