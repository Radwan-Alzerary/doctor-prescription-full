import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import VisitChart from "../../components/dashboard/VisitChart";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import Loading from "../../components/pageCompond/Loading";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import PartientsProfile from "../../components/Partients/PartientsProfile";
import { BarChart, Calendar, Users, Pill, Clipboard } from "lucide-react"
function Dashboard() {
  const webRef = useRef(null);
  const [showPartientProfile, setShowPartientProfile] = useState(false);
  const [dashboardCount, setDashboardCount] = useState({});
  const [todayPatient, setTodayPatient] = useState([]);
  const [upcomingPatient, setUpcomingPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settingData, setSettingData] = useState({});
  const [partientsSelectId, setPartientsSelectId] = useState("");
  const currentURL = window.location.origin;
  const serverAddress = currentURL.replace(/:\d+/, ":5000");

  const showImage = () => {
    const img = webRef.current.getScreenshot();
  };

  const onNameClickHandle = useCallback((id) => {
    setPartientsSelectId(id);
    setShowPartientProfile(true);
  }, []);

  useEffect(() => {
    const getSettingApi = async () => {
      try {
        const response = await axios.get(`${serverAddress}/setting/getdata`);
        setSettingData(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    getSettingApi();
  }, [serverAddress]);

  const handleEditPatientData = useCallback(
    async (data) => {
      data.id = partientsSelectId;
      try {
        await axios.post(`${serverAddress}/patients/edit`, data);
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    },
    [partientsSelectId, serverAddress]
  );

  const fetchData = useCallback(async () => {
    try {
      const [dashboardResponse, todayPatientResponse, upcomingPatientResponse] =
        await Promise.all([
          axios.get(`${serverAddress}/dashboard/getcount`),
          axios.get(`${serverAddress}/patients/today`),
          axios.get(`${serverAddress}/patients/upcoming`),
        ]);

      setDashboardCount(dashboardResponse.data);
      setTodayPatient(todayPatientResponse.data);
      setUpcomingPatient(upcomingPatientResponse.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching data:", error);
    }
  }, [serverAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = useCallback((dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }, []);

  const patientsTable = useMemo(
    () => (patients, title) => (
      <div className="h-96 rounded-xl w-full bg-white">
        <div className="w-full p-4 font-bold text-xl">{title}</div>
        <div className="relative overflow-x-auto sm:rounded-lg ">
          <table className="w-full text-sm text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  اسم المريض
                </th>
                <th scope="col" className="px-6 py-3">
                  وقت الزيارة
                </th>
                <th scope="col" className="px-6 py-3">
                  وقت اخر زيارة
                </th>
                <th scope="col" className="px-6 py-3">
                  عدد الزيارات
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="bg-white border-b hover:bg-slate-50 cursor-pointer"
                  onClick={() => onNameClickHandle(patient._id)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {patient.name}
                  </th>
                  <td className="px-6 py-4">
                    {patient.visitDate[patient.visitDate.length - 1] &&
                      patient.visitDate
                      ? formatDate(patient.visitDate[patient.visitDate.length - 1].date)
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    {patient.visitDate[patient.visitDate.length - 2] &&
                      patient.visitDate
                      ? formatDate(patient.visitDate[patient.visitDate.length - 2].date)
                      : "لا يوجد"}
                  </td>
                  <td className="px-6 py-4">{patient.visitDate.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    [formatDate, onNameClickHandle]
  );

  const statsCards = [
    { id: "Number of patients", count: dashboardCount.patientsCount, icon: Users },
    { id: "Rx number", count: dashboardCount.PrescriptionCount, icon: Clipboard },
    { id: "Drugs number", count: dashboardCount.pharmaceuticalCount, icon: Pill },
    { id: "Number of visit", count: dashboardCount.totalVisitDateCount, icon: Calendar },
    { id: "Number of visit per day", count: dashboardCount.todayCont, icon: BarChart },
  ]



  return (
    <div className="w-full p-4 h-[100%] overflow-auto">
      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {statsCards.map(({ id, count, icon: Icon }) => (
              <div key={id} className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                <Icon className="h-12 w-12 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-gray-500">
                    <FormattedMessage id={id} />
                  </p>
                  <p className="text-2xl font-semibold text-gray-800">{count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl shadow-lg bg-white p-4 z-0">
            <VisitChart dashboardVisitCount={dashboardCount.dailyVisitCounts} />
          </div>
          <div className="flex gap-4">
            {patientsTable(todayPatient, "زوار اليوم")}
            {patientsTable(upcomingPatient, "الزيارات القادمة")}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {showPartientProfile && (
        <>
          <BackGroundShadow onClick={() => setShowPartientProfile(false)} />
          <PartientsProfile
            handleEditPatientData={handleEditPatientData}
            partientId={partientsSelectId}
            settingData={settingData}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
