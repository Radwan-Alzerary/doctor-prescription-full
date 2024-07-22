import React, { useEffect, useMemo, useState } from "react";
import SurgenTypeTable from "../../components/surgeon/SurgenTypeTable";
import axios from "axios";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import SurgenNarcosisTable from "../../components/surgeon/SurgenNarcosisTable";
import NewSurgenPatient from "../../components/surgeon/NewSurgenPatient";
import Loading from "../../components/pageCompond/Loading";
import SurgenListTable from "../../components/surgeon/SurgenListTable";
import DeleteAlert from "../../components/pageCompond/DeleteAlert";

function SurgenList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const [surgicalProceduresList, setSurgicalProceduresList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [currentNewSurgery, setCurrentNewSurgery] = useState("");
  const [surgicalProceduresTypeList, setSurgicalProceduresTypeList] = useState(
    []
  );
  const [settingData, setSettingData] = useState({});

  const [surgicalProceduresDeviceList, setSurgicalProceduresDeviceList] =
    useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ id: "", type: "" });

  const [surgicalProceduresNarcosisList, setSurgicalProceduresNarcosisList] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first
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
  useEffect(() => {
    const getSettingApi = () => {
      axios
        .get(`${serverAddress}/setting/getdata`)
        .then((response) => {
          setSettingData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getSettingApi();
  }, []);

  const onDeleteConfirmHandel = (id, type) => {
    console.log(id, type);
    if (type === "surgenDelete") {
      console.log(id);
      axios
        .delete(`${serverAddress}/surgicalProcedures/surgery/${id}`)
        .then((response) => {
          // Handle success, e.g., show a success message or update the categories list
          getAllSurgenList();
          setDeleteAlert(false);
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error(`Error deleting category with ID ${id}:`, error);
        });

      console.log(`Delete clicked for id ${id}`);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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

  // Create a function to receive data from NewCategoryForm
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
  const handleEditFormData = (data) => {
    console.log(data);
    axios
      .put(
        `${serverAddress}/surgicalProcedures/surgery/${editingData._id}`,
        data
      )
      .then((response) => {
        getAllSurgenList();
        setShowEditForm(false);

        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const onCancelHande = () => {
    setDeleteAlert(false);
  };

  const onDeleteHandle = (id) => {
    if (settingData.abortProssesMsg) {
      setDeleteInfo({ id: id, type: "surgenDelete" });
      setDeleteAlert(true);
    } else {
      console.log(id);
      axios
        .delete(`${serverAddress}/surgicalProcedures/surgery/${id}`)
        .then((response) => {
          // Handle success, e.g., show a success message or update the categories list
          getAllSurgenList();
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
          console.error(`Error deleting category with ID ${id}:`, error);
        });

      console.log(`Delete clicked for id ${id}`);
    }
  };

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

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
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
  const handleAddButtonClick = () => {
    axios
      .post(`${serverAddress}/surgicalProcedures/new`, {})
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data.surgeryData);
        setCurrentNewSurgery(response.data.surgeryData);
        setShowAddForm(true);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handleHideClick = () => {
    setShowAddForm(false);
    setShowEditForm(false);
  };
  const memoizedSurgicalProceduresListList = useMemo(
    () => surgicalProceduresList,
    [surgicalProceduresList]
  );

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <SurgenListTable
            onDeleteHandle={onDeleteHandle}
            onEditHandle={onEditHandle}
            rows={memoizedSurgicalProceduresListList}
          ></SurgenListTable>
          <div className=" absolute z-50 bottom-4 left-6">
            <Fab
              onClick={handleAddButtonClick}
              color="secondary"
              aria-label="add"
            >
              <Add />
            </Fab>
            {showAddForm ? (
              <>
                {" "}
                <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
                <NewSurgenPatient
                  type={"new"}
                  onFormSubmit={handleFormData}
                  patientList={patientList}
                  surgicalProceduresTypeList={surgicalProceduresTypeList}
                  surgicalProceduresDeviceList={surgicalProceduresDeviceList}
                  surgicalProceduresNarcosisList={
                    surgicalProceduresNarcosisList
                  }
                  currentNewSurgery={currentNewSurgery}
                  refreshCurrentSurgery={refreshCurrentSurgery}
                ></NewSurgenPatient>
              </>
            ) : (
              ""
            )}
            {showEditForm ? (
              <>
                {" "}
                <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
                <NewSurgenPatient
                  currentNewSurgery={currentNewSurgery}
                  type={"edit"}
                  data={editingData}
                  patientList={patientList}
                  surgicalProceduresTypeList={surgicalProceduresTypeList}
                  surgicalProceduresDeviceList={surgicalProceduresDeviceList}
                  surgicalProceduresNarcosisList={
                    surgicalProceduresNarcosisList
                  }
                  onFormSubmit={handleFormData}
                  refreshCurrentSurgery={refreshCurrentSurgery}
                ></NewSurgenPatient>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}
      {deleteAlert ? (
        <DeleteAlert
          deleteInfo={deleteInfo}
          onShadowClick={() => {
            setDeleteAlert(false);
          }}
          onDeleteConfirmHandel={onDeleteConfirmHandel}
          onCancelAborteHande={onCancelHande}
        ></DeleteAlert>
      ) : (
        ""
      )}
    </>
  );
}

export default SurgenList;
