import React, { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { X, Mic, MicOff, Printer } from "lucide-react"
import Cookies from "js-cookie"
import axios from "axios"
import dayjs from "dayjs"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import MedicalFormChipAutoComplete from "./MedicalFormChipAutoComplete"

function MedicalForm({
  onFormSubmit,
  partientsSelectId,
  onPrinterClick,
  type,
  data,
  settingData,
  screenMode,
  handleExit,
  userEditData,
  
}) {
  const intl = useIntl()
  const [textSelector, setTextSelector] = useState("")
  const [autoCompleteList, setAutoCompleteList] = useState({})
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fumbling: "",
    medicalDiagnosis: "",
    currentMedicalHistory: "",
    medicalHistory: "",
    previousSurgeries: "",
    familyHistory: "",
    fractures: "",
    pulseRate: "",
    spo2: "",
    temperature: "",
    bloodPressure: "",
    bloodSugar: "",
    ExaminationFindining: "",
    InvestigationFinding: "",
    DateOfLastPeriod: "",
    miscarriageState: false,
    MiscarriageNo: 0,
    MiscarriageData: [],
    pregnancyState: false,
    pregnancyData: {},
  })
  const [locale, setLocale] = useState(() => Cookies.get("locale") || "ar")
  const [oldText, setOldText] = useState("")
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error("Browser doesn't support speech recognition.")
      return
    }
    if (listening) {
      const text = oldText || ""
      handleInputChange(textSelector, `${text} ${transcript}`)
    }
  }, [transcript, listening])

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
  useEffect(() => {
    const { diseases, ...formDataWithoutDiseases } = userEditData;
    setFormData(formDataWithoutDiseases);
  }, []);

  const startListening = (name) => {
    resetTranscript()
    setTextSelector(name)
    setOldText(formData[name])
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopListening = () => {
    SpeechRecognition.stopListening()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFormSubmit(formData)
  }

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleChildrenDataChange = (childIndex, property, value) => {
    const updatedChildrenData = [...formData.MiscarriageData]
    updatedChildrenData[childIndex] = {
      ...updatedChildrenData[childIndex],
      [property]: value,
    }
    setFormData({ ...formData, MiscarriageData: updatedChildrenData })
  }

  const formatDate = (date) => {
    if (!date) return ""
    return dayjs(date).format("YYYY-MM-DD")
  }

  const renderField = (fieldName, label, multiline = false) => {
    if (!settingData[`${fieldName}Active`]) return null

    return (
      <div className="mb-4">
        <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1">
          <FormattedMessage id={label} />
        </label>
        <div className="flex items-center">
          <textarea
            id={fieldName}
            value={formData[fieldName]}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            onClick={() => setTextSelector(fieldName)}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={multiline ? 3 : 1}
          />
          <button
            type="button"
            onClick={() => (!listening ? startListening(fieldName) : stopListening())}
            className={`ml-2 p-2 rounded-full ${listening && textSelector === fieldName ? "bg-red-500" : "bg-blue-500"
              } text-white`}
          >
            {listening && textSelector === fieldName ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
        {!loading && textSelector === fieldName && autoCompleteList[fieldName] && (
          <MedicalFormChipAutoComplete
            AutoCompletevalue={autoCompleteList[fieldName]}
            formDataValue={formData[fieldName]}
            handleInputChange={handleInputChange}
            target={fieldName}
          />


        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`fixed flex flex-col overflow-scroll h-[90%] left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center ${screenMode ? "h-[100%] w-full p-4" : "h-[90%]  "
        } } w-3/5 bg-white p-5 rounded-xl z-50`}
      style={{ direction: locale === "en" ? "ltr" : "rtl" }}
    >
      <div className="flex w-full justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <FormattedMessage id="Examination for" />: <span className="font-normal">{userEditData.name}</span>
        </h2>
        {screenMode && (
          <button type="button" onClick={handleExit} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="space-y-6 w-full">
        {renderField("medicalDiagnosis", "Diagnostic Details", true)}
        {renderField("currentMedicalHistory", "Present Medical History", true)}
        {renderField("medicalHistory", "Medical History", true)}
        {renderField("previousSurgeries", "Previous Surgical Procedures", true)}
        {renderField("familyHistory", "Family Medical History", true)}
        {renderField("fumbling", "Medication Allergies", true)}
        {renderField("InvestigationFinding", "InvestigationFinding", true)}
        {renderField("fractures", "fractures", true)}
        {renderField("ExaminationFindining", "ExaminationFindining", true)}
        {renderField("pulseRate", "pulseRate")}
        {renderField("spo2", "spo2")}
        {renderField("temperature", "temperature")}
        {renderField("bloodPressure", "bloodPressure")}
        {renderField("bloodSugar", "bloodSugar")}

        {settingData.DateOfLastPeriodActive && (
          <div className="mb-4">
            <label htmlFor="DateOfLastPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              <FormattedMessage id="DateOfLastPeriod" />
            </label>
            <input
              type="date"
              id="DateOfLastPeriod"
              value={formatDate(formData.DateOfLastPeriod)}
              onChange={(e) => handleInputChange("DateOfLastPeriod", e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {settingData.miscarriageStateActive && (
          <div className="mb-4">
            <label className="flex items-center space-x-3 mb-3">
              <span className="text-gray-700 font-medium">اسقاط حمل</span>
              <input
                type="checkbox"
                checked={formData.miscarriageState}
                onChange={() => handleInputChange("miscarriageState", !formData.miscarriageState)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
            {formData.miscarriageState && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="MiscarriageNo" className="block text-sm font-medium text-gray-700 mb-1">
                    عدد الاسقاطات
                  </label>
                  <input
                    type="number"
                    id="MiscarriageNo"
                    value={formData.MiscarriageNo}
                    onChange={(e) => handleInputChange("MiscarriageNo", e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {[...Array(Number(formData.MiscarriageNo))].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      value={formData.MiscarriageData[index]?.reason || ""}
                      onChange={(e) => handleChildrenDataChange(index, "reason", e.target.value)}
                      placeholder={`${index + 1} سبب الاسقاطات`}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={formatDate(formData.MiscarriageData[index]?.date)}
                      onChange={(e) => handleChildrenDataChange(index, "date", e.target.value)}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {settingData.pregnancyActive && (
          <div className="mb-4">
            <label className="flex items-center space-x-3 mb-3">
              <span className="text-gray-700 font-medium">حمل حالي</span>
              <input
                type="checkbox"
                checked={formData.pregnancyState}
                onChange={() => handleInputChange("pregnancyState", !formData.pregnancyState)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
            {formData.pregnancyState && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="DateOfLastPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      تاريخ اخر دورة
                    </label>
                    <input
                      type="date"
                      id="DateOfLastPeriod"
                      value={formatDate(formData.pregnancyData?.DateOfLastPeriod)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pregnancyData: {
                            ...formData.pregnancyData,
                            DateOfLastPeriod: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="PregnancySequence" className="block text-sm font-medium text-gray-700 mb-1">
                      تسلسل الحمل
                    </label>
                    <input
                      type="number"
                      id="PregnancySequence"
                      value={formData.pregnancyData?.PregnancySequence || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pregnancyData: {
                            ...formData.pregnancyData,
                            PregnancySequence: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="TypeOfPreviousBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      نوع الولادة السابقة
                    </label>
                    <select
                      id="TypeOfPreviousBirth"
                      value={formData.pregnancyData?.TypeOfPreviousBirth || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pregnancyData: {
                            ...formData.pregnancyData,
                            TypeOfPreviousBirth: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر نوع الولادة</option>
                      <option value="طبيعية">طبيعية</option>
                      <option value="قيصرية">قيصرية</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="HusbandsBloodType" className="block text-sm font-medium text-gray-700 mb-1">
                      فصيلة دم الزوج
                    </label>
                    <select
                      id="HusbandsBloodType"
                      value={formData.pregnancyData?.HusbandsBloodType || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pregnancyData: {
                            ...formData.pregnancyData,
                            HusbandsBloodType: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر فصيلة الدم</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="pregnancyComment" className="block text-sm font-medium text-gray-700 mb-1">
                    ملاحظات حول الحمل
                  </label>
                  <textarea
                    id="pregnancyComment"
                    value={formData.pregnancyData?.comment || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pregnancyData: {
                          ...formData.pregnancyData,
                          comment: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                {formData.pregnancyData && formData.pregnancyData.DateOfLastPeriod && (
                  <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                    <span className="font-medium">موعد الانجاب:</span>
                    <span className="font-bold">
                      {dayjs(formData.pregnancyData.DateOfLastPeriod).add(9, "month").format("YYYY-MM-DD")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex w-full justify-center items-center">
        {/* <button
          type="button"
          onClick={() => onPrinterClick(formData)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Printer className="w-5 h-5 mr-2" />
          <FormattedMessage id="Print" />
        </button> */}
        <button
          type="submit"
          className="  w-full  text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FormattedMessage id="add patient page" />
        </button>
      </div>
    </form>
  )
}

export default MedicalForm