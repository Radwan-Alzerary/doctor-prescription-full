import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import VisitChart from "../../components/dashboard/VisitChart";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import Loading from "../../components/pageCompond/Loading";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import PartientsProfile from "../../components/Partients/PartientsProfile";

function Dashboard() {
  // Declare componentRef at the component level
  const [showPartientProfile, setShowPartientProfile] = useState(false);

  const [dashboardCount, setDashboardCount] = useState({});
  const [todayPatient, setTodayPatient] = useState([]);
  const [UpcomingPatient, setUpcomingPatient] = useState([]);
  const [loading, setLoding] = useState(false);
  const [partientsSelectId, setPartientsSelectId] = useState("");
  const onNameClickHandle = (id) => {
    setPartientsSelectId(id);
    setShowPartientProfile(true);
  };

  const fetchData = async () => {
    try {
      const currentURL = window.location.origin; // Get the current URL
      const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first
      const dashboardResponse = await axios.get(
        `${serverAddress}/dashboard/getcount`
      );
      setDashboardCount(dashboardResponse.data);

      // Fetch today's patients
      const todayPatientResponse = await axios.get(
        `${serverAddress}/patients/today`
      );
      setTodayPatient(todayPatientResponse.data);

      // Fetch upcoming patients
      const upcomingPatientResponse = await axios.get(
        `${serverAddress}/patients/upcoming`
      );
      setUpcomingPatient(upcomingPatientResponse.data);
      setLoding(true);
    } catch (error) {
      setLoding(true);

      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // The empty dependency array ensures it runs once when mounted
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <div className="w-full p-4 h-[100%] overflow-auto">
      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 gap-8   ">
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow-lg">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of patients"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.patientsCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow-lg">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Rx number"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.PrescriptionCount}
              </h1>
            </div>
            <div className=" h-28 p-2 px-4 bg-white rounded-lg shadow-lg">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Drugs number"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {dashboardCount.pharmaceuticalCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow-lg">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of visit"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {" "}
                {dashboardCount.totalVisitDateCount}
              </h1>
            </div>
            <div className="  h-28 p-2 px-4 bg-white rounded-lg shadow-lg">
              <p className=" text-base">
                {" "}
                <FormattedMessage
                  id={"Number of visit per day"}
                  defaultMessage="Hello, World!"
                />
              </p>
              <h1 className=" text-6xl w-full font-medium">
                {" "}
                {dashboardCount.todayCont}
              </h1>
            </div>
          </div>
          <div className=" rounded-xl shadow-lg bg-white p-4 z-0">
            <VisitChart
              dashboardVisitCount={dashboardCount.dailyVisitCounts}
            ></VisitChart>
          </div>
          <div className="flex gap-4">
            <div className="h-96 rounded-xl w-full bg-white">
              <div className="w-full p-4 font-bold text-xl">زوار اليوم</div>
              <div class="relative overflow-x-auto sm:rounded-lg ">
                <table class="w-full text-sm text-right text-gray-500 ">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        اسم المريض
                      </th>
                      <th scope="col" class="px-6 py-3">
                        وقت الزيارة
                      </th>
                      <th scope="col" class="px-6 py-3">
                        وقت اخر زيارة
                      </th>
                      <th scope="col" class="px-6 py-3">
                        عدد الزيارات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayPatient.map((patient, index) => (
                      <tr class="bg-white border-b hover:bg-slate-50 cursor-pointer" onClick={()=>{onNameClickHandle(patient._id)}}>
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {patient.name}
                        </th>
                        <td class="px-6 py-4">
                          {" "}
                          {patient.visitDate[patient.visitDate.length - 1] &&
                          patient.visitDate
                            ? formatDate(
                                patient.visitDate[patient.visitDate.length - 1]
                                  .date
                              )
                            : ""}
                        </td>
                        <td class="px-6 py-4">
                          {" "}
                          {patient.visitDate[patient.visitDate.length - 2] &&
                          patient.visitDate
                            ? formatDate(
                                patient.visitDate[patient.visitDate.length - 2]
                                  .date
                              )
                            : "لا يوجد"}
                        </td>
                        <td class="px-6 py-4">{patient.visitDate.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="h-96 rounded-xl w-full bg-white">
              <div className="w-full p-4 font-bold text-xl">
                الزيارات القادمة
              </div>
              <div class="relative overflow-x-auto sm:rounded-lg ">
                <table class="w-full text-sm text-right text-gray-500 ">
                  <thead class="text-xs text-gray-700  uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        اسم المريض
                      </th>
                      <th scope="col" class="px-6 py-3">
                        تاريخ الزيارة القادمة{" "}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        تاريخ اخر زيارة
                      </th>
                      <th scope="col" class="px-6 py-3">
                        عدد الزيارات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {UpcomingPatient.map((patient, index) => (
                      <tr
                        class="bg-white border-b hover:bg-slate-50 cursor-pointer "
                        onClick={() => {
                          onNameClickHandle(patient._id);
                        }}
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {patient.name}
                        </th>
                        <td class="px-6 py-4">
                          {formatDate(patient.nextVisit)}
                        </td>
                        <td class="px-6 py-4">
                          {" "}
                          {patient.visitDate[patient.visitDate.length - 1] &&
                          patient.visitDate
                            ? formatDate(
                                patient.visitDate[patient.visitDate.length - 1]
                                  .date
                              )
                            : ""}
                        </td>
                        <td class="px-6 py-4">{patient.visitDate.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
      {showPartientProfile ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowPartientProfile(false);
            }}
          ></BackGroundShadow>
          <PartientsProfile partientId={partientsSelectId}></PartientsProfile>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;
