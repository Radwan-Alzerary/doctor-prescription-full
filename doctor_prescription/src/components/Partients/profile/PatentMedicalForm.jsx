import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Save, Printer } from 'lucide-react'
import dayjs from 'dayjs'

const TextField = ({ label, value, onChange, multiline = false, rows = 1 }) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    ) : (
      <input
        type="text"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
)

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8 pb-2 border-b border-gray-200">{title}</h3>
)

const PatientMedicalForm = ({ userEditData, settingData, handleEditPatientData }) => {
  const [formData, setFormData] = useState({})
  const intl = useIntl()

  useEffect(() => {
    const { diseases, ...formDataWithoutDiseases } = userEditData
    setFormData(formDataWithoutDiseases)
  }, [userEditData])

  const handleInputChange = (name, value) => {
    handleEditPatientData({ [name]: value })
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const renderTextField = (key, label, multiline = false, rows = 2) => {
    if (!settingData[`${key}Active`]) return null
    return (
      <TextField
        label={intl.formatMessage({ id: label })}
        value={formData[key] || ''}
        onChange={(value) => handleInputChange(key, value)}
        multiline={multiline}
        rows={rows}
      />
    )
  }

  return (
    <form className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {intl.formatMessage({ id: 'Patient Medical Form' })}
      </h2> */}

      <SectionTitle title={intl.formatMessage({ id: 'Medical Information' })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderTextField('medicalDiagnosis', 'Diagnostic Details', true)}
        {renderTextField('currentMedicalHistory', 'Present Medical History', true)}
        {renderTextField('medicalHistory', 'Medical History', true)}
        {renderTextField('previousSurgeries', 'Previous Surgical Procedures', true)}
        {renderTextField('familyHistory', 'Family Medical History', true)}
        {renderTextField('fumbling', 'Medication Allergies', true)}
        {renderTextField('fractures', 'Fractures', true)}
      </div>

      <SectionTitle title={intl.formatMessage({ id: 'Examination Findings' })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderTextField('ExaminationFindining', 'Examination Findings', true)}
        {renderTextField('pulseRate', 'Pulse Rate')}
        {renderTextField('spo2', 'SPO2')}
        {renderTextField('temperature', 'Temperature')}
        {renderTextField('bloodPressure', 'Blood Pressure')}
        {renderTextField('bloodSugar', 'Blood Sugar')}
      </div>

      <SectionTitle title={intl.formatMessage({ id: 'Investigation Findings' })} />
      {renderTextField('InvestigationFinding', 'Investigation Findings', true)}

      {settingData.miscarriageStateActive && formData.miscarriageState && (
        <>
          <SectionTitle title={intl.formatMessage({ id: 'Miscarriages' })} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userEditData?.MiscarriageData?.map((miscarriage, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{intl.formatMessage({ id: 'Miscarriage' })} #{index + 1}</h4>
                <p><strong>{intl.formatMessage({ id: 'Reason' })}:</strong> {miscarriage.reason}</p>
                <p><strong>{intl.formatMessage({ id: 'Date' })}:</strong> {new Date(miscarriage.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {settingData.pregnancyActive && formData.pregnancyState && (
        <>
          <SectionTitle title={intl.formatMessage({ id: 'Current Pregnancy' })} />
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>{intl.formatMessage({ id: 'Last Period Date' })}:</strong> {new Date(userEditData.pregnancyData?.DateOfLastPeriod).toLocaleDateString()}</p>
              <p><strong>{intl.formatMessage({ id: 'Pregnancy Sequence' })}:</strong> {userEditData.pregnancyData?.PregnancySequence}</p>
              <p><strong>{intl.formatMessage({ id: 'Previous Birth Type' })}:</strong> {userEditData.pregnancyData?.TypeOfPreviousBirth}</p>
              <p><strong>{intl.formatMessage({ id: "Husband's Blood Type" })}:</strong> {userEditData.pregnancyData?.HusbandsBloodType}</p>
              <p><strong>{intl.formatMessage({ id: 'Pregnancy Notes' })}:</strong> {userEditData.pregnancyData?.comment}</p>
              {userEditData.pregnancyData?.DateOfLastPeriod && (
                <p><strong>{intl.formatMessage({ id: 'Expected Delivery Date' })}:</strong> {dayjs(userEditData.pregnancyData.DateOfLastPeriod).add(9, 'month').format('YYYY-MM-DD')}</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* <div className="flex justify-between mt-8">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="inline-block mr-2" size={20} />
          {intl.formatMessage({ id: 'Save' })}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Printer className="inline-block mr-2" size={20} />
          {intl.formatMessage({ id: 'Print' })}
        </button>
      </div> */}
    </form>
  )
}

export default PatientMedicalForm