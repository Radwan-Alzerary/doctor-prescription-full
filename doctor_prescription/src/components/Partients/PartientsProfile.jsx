import { VerifiedUser } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MedicalReportTable from "./profile/MedicalReportTable";
import PrescriptionTable from "./profile/PrescriptionTable";
import LaboryReportTable from "./profile/LaboryReportTable";
import VisitDateTable from "./profile/VisitDateTable";
import PatientPictures from "./profile/PatientPictures";
import PatentMedicalForm from "./profile/PatentMedicalForm";
import PregmentData from "./profile/PregmentData";
import VisitReportTable from "./profile/VisitReportTable";

function PartientsProfile(props) {
  const [partientsProfile, setPartientsProfile] = useState([]);
  const [diseasesProfile, setDiseasesProfile] = useState([]);
  const [profileSelect, setProfileSelect] = useState("mainInfoSite");
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    refreshPaitent();
  }, []);

  useEffect(() => {
    refreshPaitent();
  }, [props.refresh]);

  const refreshPaitent = () => {
    axios
      .get(`${serverAddress}/patients/medicalinfo/${props.partientId}`)
      .then((response) => {
        setPartientsProfile(response.data); // Update the categories state with the fetched data
        setDiseasesProfile(response.data.diseases);
      })

      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleEditPatientData = (data) => {
    data.id = partientsProfile._id;
  };

  return (
    <form className="fixed flex flex-col  left-[50%] top-[50%]  transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 h-[85%] bg-slate-50 p-5 rounded-xl z-30">
      <div className="  w-full flex flex-col  text-center items-center">
        <Avatar
          className="w-full"
          alt={partientsProfile.name}
          sx={{ width: 120, height: 120 }}
        />{" "}
        <h5>المريض : {partientsProfile.name}</h5>
        <h5>{partientsProfile.phonNumber}</h5>
      </div>
      <div className="flex gap-8 w-full justify-center text-center">
        <div
          onClick={() => {
            setProfileSelect("mainInfoSite");
          }}
          className={`${
            profileSelect === "mainInfoSite" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          المعلومات الشخصية
        </div>
        {/* <div
          onClick={() => {
            setProfileSelect("pregmentSite");
          }}
          className={`${
            profileSelect === "pregmentSite" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          معلومات الحمل{" "}
        </div> */}

        <div
          onClick={() => {
            setProfileSelect("midicalInfo");
          }}
          className={`${
            profileSelect === "midicalInfo" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          طبلة المريض
        </div>

        <div
          onClick={() => {
            setProfileSelect("patientPictures");
          }}
          className={`${
            profileSelect === "patientPictures"
              ? "bg-green-200"
              : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          معرض المريض
        </div>
        <div
          onClick={() => {
            setProfileSelect("visitReport");
          }}
          className={`${
            profileSelect === "visitReport" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          الزيارات
        </div>

        <div
          onClick={() => {
            setProfileSelect("prescriptionSite");
          }}
          className={`${
            profileSelect === "prescriptionSite"
              ? "bg-green-200"
              : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          الوصفات
        </div>
        <div
          onClick={() => {
            setProfileSelect("reportSite");
          }}
          className={`${
            profileSelect === "reportSite" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          التقارير الطبية
        </div>
        <div
          onClick={() => {
            setProfileSelect("labory");
          }}
          className={`${
            profileSelect === "labory" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          التقرير المختبري
        </div>

        <div
          onClick={() => {
            setProfileSelect("History");
          }}
          className={`${
            profileSelect === "History" ? "bg-green-200" : "bg-slate-200"
          }  p-2 w-48 rounded-full hover:bg-slate-100 cursor-pointer`}
        >
          تاريخ الزيارات
        </div>
      </div>
      {profileSelect === "mainInfoSite" ? (
        <div className="w-full  overflow-scroll  h-full py-4">
          <div className="">
            <div className=" bg-white shadow p-3 rounded-2xl">
              <div className=" font-medium text-xl">المعلومات الشخصية</div>
              <div className=" flex justify-between w-full my-2">
                {partientsProfile.age ? (
                  <p>
                    العمر :{partientsProfile.age ? partientsProfile.age : 0} سنة
                    <p>
                      {" "}
                      {partientsProfile.monthAge
                        ? partientsProfile.monthAge
                        : 0}{" "}
                      شهر
                    </p>
                  </p>
                ) : (
                  ""
                )}
                {partientsProfile.weight ? (
                  <p>الوزن : {partientsProfile.weight} كيلو</p>
                ) : (
                  ""
                )}
                {partientsProfile.length ? (
                  <p>الطول : {partientsProfile.length}</p>
                ) : (
                  ""
                )}

                <p>الجنس : {partientsProfile.gender}</p>
                {partientsProfile.bloodType ? (
                  <p>صنف الدم : {partientsProfile.bloodType}</p>
                ) : (
                  ""
                )}

                {partientsProfile.jop ? (
                  <p>المهنة : {partientsProfile.jop}</p>
                ) : (
                  ""
                )}

                {partientsProfile.MaritalStatus ? (
                  <p>الحالة الزوجية : {partientsProfile.MaritalStatus}</p>
                ) : (
                  ""
                )}
                {partientsProfile.Sequence ? (
                  <p>التسلسل : {partientsProfile.Sequence}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            {partientsProfile.description ? (
              <div className=" bg-white p-3 rounded-2xl shadow my-4">
                <div className=" font-medium text-xl">الملاحضات</div>
                <div className="flex gap-4 ">
                  <p>{partientsProfile.description} </p>
                </div>
              </div>
            ) : (
              ""
            )}

            {diseasesProfile.length > 0 ? (
              <div className=" bg-white p-3 rounded-2xl shadow my-2">
                <div className=" font-medium text-xl">الامراض</div>
                <div className="flex gap-4 my-4">
                  {diseasesProfile.map((diseases, index) => (
                    <Chip
                      label={diseases.name}
                      variant="outlined"
                      onClick={() => {
                        console.log(diseases);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {partientsProfile.fumbling ? (
              <div className=" bg-white p-3 rounded-2xl shadow my-4">
                <div className=" font-medium text-xl">التحسس</div>
                <div className="flex gap-4 ">
                  <p>{partientsProfile.fumbling} </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {partientsProfile.childrenData  ? (
              <div className=" bg-white p-3 rounded-2xl shadow my-4">
                <div className=" font-medium text-xl">الاطفال</div>
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    {partientsProfile.childrenData
                      ? partientsProfile.childrenData.map((child, index) => (
                          <div className="">
                            <div>{`طفل رقم ${index + 1}`}</div>
                            <div>{`نوع الولادة  : ${child.type}`}</div>
                            <div>
                              {new Date(child.date).toLocaleDateString("en-GB")}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {profileSelect === "pregmentSite" ? (
        <>
          <div>xz</div>
        </>
      ) : (
        ""
      )}
      {profileSelect === "midicalInfo" ? (
        <PatentMedicalForm
          settingData={props.settingData}
          handleEditPatientData={props.handleEditPatientData}
          onFormSubmit={handleEditPatientData}
          userEditData={partientsProfile}
        ></PatentMedicalForm>
      ) : (
        ""
      )}
      {profileSelect === "patientPictures" ? (
        <>
          <PatientPictures
            refreshPaitent={refreshPaitent}
            id={partientsProfile._id}
            images={partientsProfile.galary}
          ></PatientPictures>
        </>
      ) : (
        ""
      )}

      {profileSelect === "visitReport" ? (
        <>
          <VisitReportTable
            visitData={partientsProfile.visit}
            partientsProfileId={partientsProfile._id}
            onVisitEditHandel={props.handelVisitReportEdit}
            onVisitDeleteHandel={props.handelVisitReportDelete}
          ></VisitReportTable>
        </>
      ) : (
        ""
      )}

      {profileSelect === "prescriptionSite" ? (
        <>
          <PrescriptionTable
            prescriptionData={partientsProfile.prescription}
            partientsProfileId={partientsProfile._id}
            onPrescriptionEditHandel={props.onPrescriptionEditHandel}
            onPrescriptionDeleteHande={props.onPrescriptionDeleteHande}
          ></PrescriptionTable>
        </>
      ) : (
        ""
      )}
      {profileSelect === "reportSite" ? (
        <>
          <MedicalReportTable
            handleReportDelete={props.handleReportDelete}
            handleReportEdit={props.handleReportEdit}
            medicalReportData={partientsProfile.medicalReport}
          ></MedicalReportTable>
        </>
      ) : (
        ""
      )}
      {profileSelect === "labory" ? (
        <>
          <LaboryReportTable
            laboryData={partientsProfile.labory}
            handleLabReportEdit={props.handleLabReportEdit}
            handleLabReportDelete={props.handleLabReportDelete}
          ></LaboryReportTable>
        </>
      ) : (
        ""
      )}

      {profileSelect === "History" ? (
        <VisitDateTable visitData={partientsProfile.visitDate}></VisitDateTable>
      ) : (
        ""
      )}
    </form>
  );
}

export default PartientsProfile;
