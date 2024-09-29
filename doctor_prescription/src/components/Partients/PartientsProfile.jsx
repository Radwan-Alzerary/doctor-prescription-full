import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { X, User, Phone, Calendar, Weight, Ruler, Droplet, Briefcase, Heart, Baby, FileText, Pill, TestTube, Clock } from 'lucide-react'

// Import other components (assuming they exist in your project structure)
import MedicalReportTable from './profile/MedicalReportTable'
import PrescriptionTable from './profile/PrescriptionTable'
import LaboryReportTable from './profile/LaboryReportTable'
import VisitDateTable from './profile/VisitDateTable'
import PatientPictures from './profile/PatientPictures'
import PatentMedicalForm from './profile/PatentMedicalForm'
import VisitReportTable from './profile/VisitReportTable'

function PartientsProfile({
  partientId,
  refresh,
  screenMode,
  handleExit,
  handleScannerHandle,
  onImageDeleteHandle,
  handelVisitReportEdit,
  handelVisitReportDelete,
  onPrescriptionEditHandel,
  onPrescriptionDeleteHande,
  handleReportDelete,
  handleReportEdit,
  handleLabReportEdit,
  handleLabReportDelete,
  handleEditPatientData,
  settingData,
}) {
  const [partientsProfile, setPartientsProfile] = useState({})
  const [diseasesProfile, setDiseasesProfile] = useState([])
  const [activeTab, setActiveTab] = useState('personal')

  const currentURL = window.location.origin
  const serverAddress = currentURL.replace(/:\d+/, ':5000')

  useEffect(() => {
    refreshPaitent()
  }, [refresh, partientId])

  const refreshPaitent = () => {
    axios
      .get(`${serverAddress}/patients/medicalinfo/${partientId}`)
      .then((response) => {
        setPartientsProfile(response.data)
        setDiseasesProfile(response.data.diseases || [])
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error)
      })
  }

  const handleEditPatientDataWrapper = (data) => {
    handleEditPatientData({ ...data, id: partientsProfile._id })
  }

  const sections = [
    { id: 'personal', label: 'المعلومات الشخصية', icon: User },
    { id: 'medical', label: 'طبلة المريض', icon: Heart },
    { id: 'gallery', label: 'معرض المريض', icon: FileText },
    { id: 'visits', label: 'الزيارات', icon: Calendar },
    { id: 'prescriptions', label: 'الوصفات', icon: Pill },
    { id: 'reports', label: 'التقارير الطبية', icon: FileText },
    { id: 'lab', label: 'التقرير المختبري', icon: TestTube },
    { id: 'history', label: 'تاريخ الزيارات', icon: Clock },
  ]

  return (
      <div className={`bg-white fixed z-[500]   left-[50%] top-[50%] overflow-scroll h-[80%]  transform translate-x-[-50%] translate-y-[-50%] ${screenMode ? 'w-full min-h-screen' : 'w-11/12 max-w-7xl mx-auto my-8'}  rounded-lg shadow-xl`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">ملف المريض</h2>
          <button onClick={handleExit} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/4 border-b md:border-r md:border-b-0 p-4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="h-16 w-16 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{partientsProfile.name}</h3>
            <p className="text-gray-600 mb-4 flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              {partientsProfile.phonNumber}
            </p>
            <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex items-center justify-start p-2 rounded ${
                    activeTab === section.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="mr-2 h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 p-6 ">
            {activeTab === 'personal' && <PersonalInfo profile={partientsProfile} diseases={diseasesProfile} />}
            {activeTab === 'medical' && (
              <PatentMedicalForm
                settingData={settingData}
                handleEditPatientData={handleEditPatientDataWrapper}
                onFormSubmit={handleEditPatientDataWrapper}
                userEditData={partientsProfile}
              />
            )}
            {activeTab === 'gallery' && (
              <PatientPictures
                handleScannerHandle={handleScannerHandle}
                onImageDeleteHandle={onImageDeleteHandle}
                refreshPaitent={refreshPaitent}
                id={partientsProfile._id}
                images={partientsProfile.galary}
              />
            )}
            {activeTab === 'visits' && (
              <VisitReportTable
                visitData={partientsProfile.visit}
                partientsProfileId={partientsProfile._id}
                onVisitEditHandel={handelVisitReportEdit}
                onVisitDeleteHandel={handelVisitReportDelete}
              />
            )}
            {activeTab === 'prescriptions' && (
              <PrescriptionTable
                prescriptionData={partientsProfile.prescription}
                partientsProfileId={partientsProfile._id}
                onPrescriptionEditHandel={onPrescriptionEditHandel}
                onPrescriptionDeleteHande={onPrescriptionDeleteHande}
              />
            )}
            {activeTab === 'reports' && (
              <MedicalReportTable
                handleReportDelete={handleReportDelete}
                handleReportEdit={handleReportEdit}
                medicalReportData={partientsProfile.medicalReport}
              />
            )}
            {activeTab === 'lab' && (
              <LaboryReportTable
                laboryData={partientsProfile.labory}
                handleLabReportEdit={handleLabReportEdit}
                handleLabReportDelete={handleLabReportDelete}
              />
            )}
            {activeTab === 'history' && <VisitDateTable visitData={partientsProfile.visitDate} />}
          </div>
        </div>
      </div>
  )
}

function PersonalInfo({ profile, diseases }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">المعلومات الشخصية</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.age && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span>
                العمر: {profile.age} سنة {profile.monthAge ? `${profile.monthAge} شهر` : ''}
              </span>
            </div>
          )}
          {profile.weight && (
            <div className="flex items-center">
              <Weight className="mr-2 h-4 w-4 text-gray-500" />
              <span>الوزن: {profile.weight} كيلو</span>
            </div>
          )}
          {profile.length && (
            <div className="flex items-center">
              <Ruler className="mr-2 h-4 w-4 text-gray-500" />
              <span>الطول: {profile.length}</span>
            </div>
          )}
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <span>الجنس: {profile.gender}</span>
          </div>
          {profile.bloodType && (
            <div className="flex items-center">
              <Droplet className="mr-2 h-4 w-4 text-gray-500" />
              <span>صنف الدم: {profile.bloodType}</span>
            </div>
          )}
          {profile.jop && (
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
              <span>المهنة: {profile.jop}</span>
            </div>
          )}
          {profile.MaritalStatus && (
            <div className="flex items-center">
              <Heart className="mr-2 h-4 w-4 text-gray-500" />
              <span>الحالة الزوجية: {profile.MaritalStatus}</span>
            </div>
          )}
          {profile.Sequence && (
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              <span>التسلسل: {profile.Sequence}</span>
            </div>
          )}
        </div>
      </div>

      {profile.description && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">الملاحظات</h3>
          <p>{profile.description}</p>
        </div>
      )}

      {diseases.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">الامراض</h3>
          <div className="flex flex-wrap gap-2">
            {diseases.map((disease, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {disease.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.fumbling && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">التحسس</h3>
          <p>{profile.fumbling}</p>
        </div>
      )}

      {profile.childrenData && profile.childrenData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">الاطفال</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.childrenData.map((child, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Baby className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">طفل رقم {index + 1}</p>
                    <p className="text-sm text-gray-600">نوع الولادة: {child.type}</p>
                    <p className="text-sm text-gray-600">
                      تاريخ الولادة: {new Date(child.date).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PartientsProfile