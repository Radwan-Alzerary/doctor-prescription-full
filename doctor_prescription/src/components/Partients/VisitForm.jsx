import React, { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { X, Printer, ChevronDown, Clock, ChevronRight } from "lucide-react"
import Cookies from "js-cookie"
import axios from "axios"
import MedicalFormChipAutoComplete from "./MedicalFormChipAutoComplete"
import BackGroundShadow from "../pageCompond/BackGroundShadow"

const TextField = ({ label, value, onChange, multiline = false, onClick }) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        rows={3}
      />
    ) : (
      <input
        type="text"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
      />
    )}
  </div>
)

const Select = ({ label, value, onChange, options }) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  </div>
)

// const MedicalFormChipAutoComplete = ({ AutoCompletevalue, formDataValue, handleInputChange, target }) => {
//   return (
//     <div className="flex flex-wrap gap-2 mt-2">
//       {AutoCompletevalue.map((item, index) => (
//         <button
//           key={index}
//           type="button"
//           onClick={() => handleInputChange(target, formDataValue ? `${formDataValue}, ${item}` : item)}
//           className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {item}
//         </button>
//       ))}
//     </div>
//   )
// }
const VisitHistoryModal = ({ visits, onClose, settingData }) => {
  const intl = useIntl()
  const [expandedVisit, setExpandedVisit] = useState(null)

  const renderField = (visit, fieldName, label) => {
    if (!settingData.visitForm?.[`visit${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]) return null;
    return (
      <p className="mb-2">
        <strong>{intl.formatMessage({ id: label })}:</strong> {visit[fieldName]}
      </p>
    )
  }

  const toggleExpand = (index) => {
    setExpandedVisit(expandedVisit === index ? null : index)
  }

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            <FormattedMessage id="Visit History" />
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {visits.map((visit, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{new Date(visit.createdAt).toLocaleString()}</h3>
              <button
                className="text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => toggleExpand(index)}
              >
                {expandedVisit === index ? (
                  <>
                    <FormattedMessage id="Hide Details" />
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    <FormattedMessage id="View Details" />
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
            {renderField(visit, 'CauseOfVisite', 'CauseOfVisite')}
            {renderField(visit, 'chiefComplaint', 'Diagnostic Details')}
            {renderField(visit, 'diagnosis', 'diagnosis')}
            {expandedVisit === index && (
              <div className="mt-4 space-y-2">
                {renderField(visit, 'PriorChronicTherapy', 'PriorChronicTherapy')}
                {renderField(visit, 'investigation', 'InvestigationFinding')}
                {renderField(visit, 'management', 'management')}
                {renderField(visit, 'chronicTherapy', 'chronicTherapy')}
                {renderField(visit, 'analysis', 'analysis')}
                {renderField(visit, 'riskFactor', 'riskFactor')}
                {renderField(visit, 'pastMedicalHistory', 'pastMedicalHistory')}
                {renderField(visit, 'drugHistory', 'drugHistory')}
                {renderField(visit, 'suspendedDx', 'suspendedDx')}
                {renderField(visit, 'type', 'Visit Type')}
                {renderField(visit, 'priority', 'Priority')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>

  )
}
function VisitForm({
  onFormSubmit,
  partientsSelectId,
  onPrinterClick,
  type,
  data,
  screenMode,
  handleExit,
  userEditData,
  settingData
}) {
  const intl = useIntl()
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    dateOfVisit: "",
    investigation: "",
    diagnosis: "",
    PriorChronicTherapy: "",
    CauseOfVisite: "",
    management: "",
    type: "",
    patientId: partientsSelectId,
    priority: "",
    chronicTherapy: "",
    analysis: "",
    riskFactor: "",
    pastMedicalHistory: "",
    drugHistory: "",
    suspendedDx: "",
  })

  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar"
  })

  const [autoCompleteList, setAutoCompleteList] = useState({})
  const [loading, setLoading] = useState(true)
  const [textSelector, setTextSelector] = useState("")
  const [showVisitHistory, setShowVisitHistory] = useState(false)
  const [visitHistory, setVisitHistory] = useState([])

  useEffect(() => {
    if (type === "edit") {
      setFormData({ ...formData, ...data })
    }
  }, [type, data])

  useEffect(() => {
    const getAutoCompleteList = async () => {
      try {
        const currentURL = window.location.origin
        const serverAddress = currentURL.replace(/:\d+/, ":5000")
        const response = await axios.get(`${serverAddress}/autoComplete/getall/`)
        setAutoCompleteList(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoading(false)
      }
    }
    getAutoCompleteList()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    onFormSubmit(formData)
  }

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const renderField = (fieldName, label, multiline = false) => {
    if (!settingData.visitForm?.[`visit${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`]) return null;
    return (
      <div className="w-full mb-4">
        <TextField
          label={intl.formatMessage({ id: label })}
          value={formData[fieldName]}
          onChange={(value) => handleInputChange(fieldName, value)}
          multiline={multiline}
          onClick={() => setTextSelector(fieldName)}
        />
        {!loading && textSelector === fieldName && (
          <MedicalFormChipAutoComplete
            AutoCompletevalue={autoCompleteList[`visit${fieldName}`] || []}
            formDataValue={formData[fieldName]}
            handleInputChange={handleInputChange}
            target={fieldName}
          />
        )}
      </div>
    )
  }

  const fetchVisitHistory = async () => {
    try {
      const currentURL = window.location.origin
      const serverAddress = currentURL.replace(/:\d+/, ":5000")
      const response = await axios.get(`${serverAddress}/visit/history/${partientsSelectId}`)
      setVisitHistory(response.data)
      setShowVisitHistory(true)
    } catch (error) {
      console.error("Error fetching visit history:", error)
    }
  }

  return (
    <div
    >
      <div className={`fixed flex flex-col items-center overflow-scroll left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5  ${screenMode ? "h-[100%] w-full p-4" : "w-3/5 h-[90%]"
        } }  bg-white p-5 rounded-xl z-50`}
        style={{
          direction: locale === "en" ? "ltr" : "rtl",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6 w-full" style={{ direction: locale === "en" ? "ltr" : "rtl" }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              <FormattedMessage id="visit Information" />
              {userEditData ? `: ${userEditData.name}` : ""}
            </h2>
            {screenMode && (
              <button onClick={handleExit} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={fetchVisitHistory}
            className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <Clock className="w-5 h-5 mr-2" />
            <FormattedMessage id="Show Visit History" />
          </button>

          {renderField("CauseOfVisite", "CauseOfVisite", true)}
          {renderField("PriorChronicTherapy", "PriorChronicTherapy", true)}
          {renderField("chiefComplaint", "Diagnostic Details", true)}
          {renderField("investigation", "InvestigationFinding", true)}
          {renderField("diagnosis", "diagnosis", true)}
          {renderField("management", "management", true)}
          {renderField("chronicTherapy", "chronicTherapy", true)}
          {renderField("analysis", "analysis", true)}
          {renderField("riskFactor", "riskFactor", true)}
          {renderField("pastMedicalHistory", "pastMedicalHistory", true)}
          {renderField("drugHistory", "drugHistory", true)}
          {renderField("suspendedDx", "suspendedDx", true)}

          {settingData.visitForm?.visitType && (
            <Select
              label={intl.formatMessage({ id: "Visit Type" })}
              value={formData.type}
              onChange={(value) => handleInputChange("type", value)}
              options={[
                { value: "زيارة", label: "زيارة" },
                { value: "مراجعة", label: "مراجعة" },
              ]}
            />
          )}

          {settingData.visitForm?.visitPriority && (
            <Select
              label={intl.formatMessage({ id: "Priority" })}
              value={formData.priority}
              onChange={(value) => handleInputChange("priority", value)}
              options={[
                { value: "normal", label: "اعتيادية" },
                { value: "medium", label: "متوسطة" },
                { value: "high", label: "عالية" },
                { value: "dangers", label: "خطيرة" },
              ]}
            />
          )}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FormattedMessage id={type === "edit" ? "edit visit" : "add new visit"} />
            </button>
          </div>
        </form>
      </div>

      {showVisitHistory && (
        <VisitHistoryModal settingData={settingData} visits={visitHistory} onClose={() => setShowVisitHistory(false)} />
      )}
    </div>
  )
}

export default VisitForm