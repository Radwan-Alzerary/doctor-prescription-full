import { VerifiedUser } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MedicalReportTable from "./profile/MedicalReportTable";
import PrescriptionTable from "./profile/PrescriptionTable";

function PartientsProfile(props) {
  const [partientsProfile, setPartientsProfile] = useState([]);
  const [diseasesProfile, setDiseasesProfile] = useState([]);
  const [profileSelect, setProfileSelect] = useState("mainInfoSite");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patients/medicalinfo/${props.partientId}`)
      .then((response) => {
        setPartientsProfile(response.data); // Update the categories state with the fetched data
        setDiseasesProfile(response.data.diseases);

        console.log(response.data);
        console.log(response.data.medicalReport);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // console.log();
  }, []);

  return (
    <form className="fixed flex flex-col  left-[50%] top-[50%]  transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 h-[85%] bg-slate-50 p-5 rounded-xl z-50">
      <div className="  w-full flex flex-col  text-center items-center">
        <Avatar
          className="w-full"
          alt={partientsProfile.name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 120, height: 120 }}
        />{" "}
        <h5>المريض : {partientsProfile.name}</h5>
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
        <div className="w-full  h-full py-4">
          <div className="">
            <div className=" bg-white shadow p-3 rounded-2xl">
              <div className=" font-medium text-xl">المعلومات الشخصية</div>
              <div className=" flex justify-between w-full my-2">
                <p>العمر : {partientsProfile.age}</p>
                <p>الوزن : {partientsProfile.weight} كيلو</p>
                <p>الطول : {partientsProfile.length}</p>
                <p>الجنس : {partientsProfile.gender}</p>
              </div>
            </div>
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
            <div className=" bg-white p-3 rounded-2xl shadow my-4">
              <div className=" font-medium text-xl">التحسس</div>
              <div className="flex gap-4 ">
                <p>يعاني المريض من تحسس شديد من الحبوب </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {profileSelect === "prescriptionSite" ? (
        <>
          <PrescriptionTable
            prescriptionData={partientsProfile.prescription}
          ></PrescriptionTable>
        </>
      ) : (
        ""
      )}
      {profileSelect === "reportSite" ? (
        <>
          <MedicalReportTable
            medicalReportData={partientsProfile.medicalReport}
          ></MedicalReportTable>
        </>
      ) : (
        ""
      )}
      {profileSelect === "History" ? "" : ""}
    </form>
  );
}

export default PartientsProfile;
