import React, { useEffect, useState } from "react";
import PharmaceuticalTable from "../../components/pharmaceutical/PharmaceuticalTable";
import { Fab, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import NewPharmaceuticalForm from "../../components/pharmaceutical/NewPharmaceuticalForm";
import axios from "axios";
import { useIsAuthenticated } from "react-auth-kit";
import EditPharmaceForm from "../../components/pharmaceutical/EditPharmaceForm";

function CustomizedInputBase() {
  return (
    <div className=" flex flex-col justify-center items-center p-4">
      <div className="flex bg-white px-4 py-1 rounded-3xl w-1/2">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="البحث عن دواء"
          inputProps={{ "aria-label": "البحث عن دواء" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

function Pharmaceutical() {
  const { isAuthenticated } = useIsAuthenticated();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const [pharmaceList, setPharmaceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [inTakeTimeList, setInTakeTime] = useState([]);
  const [addFormData, setAddFormData] = useState({});

  // Create a function to receive data from NewCategoryForm
  const handleFormData = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/pharmaceutical/new", data)
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    // // Update the state or perform actions with the data as needed
    setAddFormData(data);
  };
  const handleEditFormData = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/pharmaceutical/edit", data)
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    // // Update the state or perform actions with the data as needed
    setAddFormData(data);
  };

  const onDeleteHandle = (id) => {
    console.log(id)
    axios
      .delete(`http://localhost:5000/pharmaceutical/delete/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        getAllBill();
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };
  const onEditHandle = (id) => {
    console.log(id)
    axios
      .get(`http://localhost:5000/pharmaceutical//getone/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(response.data)
        setShowEditForm(true)
        setEditingData(response.data)
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });

    console.log(`Delete clicked for id ${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/getall")
      .then((response) => {
        setCategoryList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  useEffect(() => {
    getAllBill();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getAllBill = () => {
    axios
      .get("http://localhost:5000/pharmaceutical/getall")
      .then((response) => {
        setPharmaceList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/intaketime/getall")
      .then((response) => {
        setInTakeTime(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handeSearchInput = (event) => {
    const searchInputValue = event.target.value;
    axios
      .get(`http://localhost:5000/pharmaceutical/getbyname/${searchInputValue}`)
      .then((response) => {
        setPharmaceList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    console.log(event.target.value);
  };


  const handleHideClick = () => {
    setShowAddForm(false);
    setShowEditForm(false)
  };
  return (
    <div className=" h-[92vh] overflow-auto">
      <div className=" flex flex-col justify-center items-center p-4">
        <div className="flex bg-white px-4 py-1 rounded-3xl w-1/2">
          <InputBase
            onChange={handeSearchInput}
            sx={{ ml: 1, flex: 1 }}
            placeholder="البحث عن دواء"
            inputProps={{ "aria-label": "البحث عن دواء" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <PharmaceuticalTable
        onDeleteHandle={onDeleteHandle}
        onEditHandle={onEditHandle}
        rows={pharmaceList}
      ></PharmaceuticalTable>
      <div className=" absolute z-50 bottom-4 left-6">
        <Fab onClick={handleAddButtonClick} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </div>

      {showAddForm ? (
        <>
          {" "}
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewPharmaceuticalForm
            inTakeTimeList={inTakeTimeList}
            onFormSubmit={handleFormData}
            categoryList={categoryList}
          ></NewPharmaceuticalForm>
        </>
      ) : (
        ""
      )}
            {showEditForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <EditPharmaceForm
            inTakeTimeList={inTakeTimeList}
            onFormSubmit={handleEditFormData}
            editingData={editingData}
            categoryList={categoryList}
          ></EditPharmaceForm>
        </>
      ) : (
        ""
      )}

    </div>
  );
}

export default Pharmaceutical;
