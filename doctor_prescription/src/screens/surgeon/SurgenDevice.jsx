import React, { useEffect, useState } from "react";
import SurgenTypeTable from "../../components/surgeon/SurgenTypeTable";
import axios from "axios";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import NewSugenTypeForm from "../../components/surgeon/NewSugenTypeForm";
import NewSurgenDeviceForm from "../../components/surgeon/NewSurgenDeviceForm";
import SurgeonDeviceTable from "../../components/surgeon/SurgeonDeviceTable";

function SurgenDevice() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const [surgicalProceduresDeviceList, setSurgicalProceduresDeviceList] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  // Create a function to receive data from NewCategoryForm
  const handleFormData = (data) => {
    console.log(data);
    axios
      .post(`${serverAddress}/surgicalProceduresDevice/devices`, data)
      .then((response) => {
        getAllSurgenType();
        setShowAddForm(false);

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
        `${serverAddress}/surgicalProceduresDevice/devices/${editingData._id}`,
        data
      )
      .then((response) => {
        getAllSurgenType();
        setShowEditForm(false);

        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const onDeleteHandle = (id) => {
    console.log(id);
    axios
      .delete(`${serverAddress}/surgicalProceduresDevice/devices/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        getAllSurgenType();
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };

  const onEditHandle = (id) => {
    console.log(id);
    axios
      .get(`${serverAddress}/surgicalProceduresDevice/devices/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(response.data);
        setShowEditForm(true);
        setEditingData(response.data);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };

  useEffect(() => {
    getAllSurgenType();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getAllSurgenType = () => {
    axios
      .get(`${serverAddress}/surgicalProceduresDevice/devices`)
      .then((response) => {
        setSurgicalProceduresDeviceList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };
  const handleHideClick = () => {
    setShowAddForm(false);
    setShowEditForm(false);
  };

  return (
    <>
      <SurgeonDeviceTable
        onDeleteHandle={onDeleteHandle}
        onEditHandle={onEditHandle}
        rows={surgicalProceduresDeviceList}
      ></SurgeonDeviceTable>
      <div className=" absolute z-50 bottom-4 left-6">
        <Fab onClick={handleAddButtonClick} color="secondary" aria-label="add">
          <Add />
        </Fab>
        {showAddForm ? (
          <>
            {" "}
            <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
            <NewSurgenDeviceForm
              type={"new"}
              onFormSubmit={handleFormData}
            ></NewSurgenDeviceForm>
          </>
        ) : (
          ""
        )}
        {showEditForm ? (
          <>
            {" "}
            <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
            <NewSurgenDeviceForm
              type={"edit"}
              data={editingData}
              onFormSubmit={handleEditFormData}
            ></NewSurgenDeviceForm>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default SurgenDevice;
