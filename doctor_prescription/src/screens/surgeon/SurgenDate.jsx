import React, { useEffect, useState } from "react";
import FullCalender from "../../components/surgeon/FullCalender";
import axios from "axios";
import Loading from "../../components/pageCompond/Loading";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import NewSurgenPatient from "../../components/surgeon/NewSurgenPatient";

function SurgenDate() {
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first
  const [surgicalProceduresList, setSurgicalProceduresList] = useState();
  const [showAddForm, setShowAddForm] = useState(false);

  const [surgicalProceduresTypeList, setSurgicalProceduresTypeList] = useState(
    []
  );
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const [surgicalProceduresDeviceList, setSurgicalProceduresDeviceList] =
    useState([]);
  const [surgicalProceduresNarcosisList, setSurgicalProceduresNarcosisList] =
    useState([]);
  const [patientList, setPatientList] = useState([]);
  const [currentNewSurgery, setCurrentNewSurgery] = useState("");
  const onEditHandle = (id) => {
    console.log(id);
    axios
      .get(`${serverAddress}/surgicalProcedures/surgery/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(response.data);
        setShowEditForm(true);
        setCurrentNewSurgery(response.data);
        setEditingData(response.data);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };
  const handleFormData = (data) => {
    console.log(data);
    axios
      .post(`${serverAddress}/surgicalProcedures/surgery`, {
        data,
        id: currentNewSurgery._id,
      })
      .then((response) => {
        getAllSurgenList();
        setShowAddForm(false);
        setShowEditForm(false);

        // Handle the response if needed
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const fetchData = async () => {
    try {
      const currentURL = window.location.origin; // Get the current URL
      const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first
      const getAllSurgenNarcosis = await axios.get(
        `${serverAddress}/surgicalProceduresNarcosis/narcosis`
      );
      setSurgicalProceduresNarcosisList(getAllSurgenNarcosis.data);

      // Fetch today's patients
      const getAllSurgenType = await axios.get(
        `${serverAddress}/surgicalprocedurestype/types`
      );
      setSurgicalProceduresTypeList(getAllSurgenType.data);

      // Fetch upcoming patients
      const getAllSurgeryList = await axios.get(
        `${serverAddress}/surgicalProcedures/surgery`
      );
      setSurgicalProceduresList(getAllSurgeryList.data);

      const getAllSurgenDevices = await axios.get(
        `${serverAddress}/surgicalProceduresDevice/devices`
      );
      setSurgicalProceduresDeviceList(getAllSurgenDevices.data);

      const getPatientsList = await axios.get(
        `${serverAddress}/patients/getall`
      );
      setPatientList(getPatientsList.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching data:", error);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
    getAllSurgenList();
  }, []);

  const getAllSurgenList = () => {
    axios
      .get(`${serverAddress}/surgicalProcedures/surgery`)
      .then((response) => {
        setSurgicalProceduresList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const refreshCurrentSurgery = () => {
    axios
      .get(
        `${serverAddress}/surgicalProcedures/surgery/${currentNewSurgery._id}`
      )
      .then((response) => {
        setCurrentNewSurgery(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <div>
      {!loading ? (
        <FullCalender
        onEditHandle={onEditHandle}
          surgicalProceduresList={surgicalProceduresList}
        ></FullCalender>
      ) : (
        <Loading></Loading>
      )}
      {showEditForm ? (
        <>
          {" "}
          <BackGroundShadow
            onClick={() => {
              setShowEditForm(false);
            }}
          ></BackGroundShadow>
          <NewSurgenPatient
            currentNewSurgery={currentNewSurgery}
            type={"edit"}
            data={editingData}
            patientList={patientList}
            surgicalProceduresTypeList={surgicalProceduresTypeList}
            surgicalProceduresDeviceList={surgicalProceduresDeviceList}
            surgicalProceduresNarcosisList={surgicalProceduresNarcosisList}
            onFormSubmit={handleFormData}
            refreshCurrentSurgery={refreshCurrentSurgery}
          ></NewSurgenPatient>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SurgenDate;
