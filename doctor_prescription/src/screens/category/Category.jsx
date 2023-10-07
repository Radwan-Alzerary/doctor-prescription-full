import React, { useEffect, useState } from "react";
import { Fab, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import CategoryTable from "../../components/Category/CategoryTable";
import NewCategoryForm from "../../components/Category/NewCategoryForm";
import axios from "axios";

function CustomizedInputBase() {
  return (
    <div className=" flex flex-col justify-center items-center p-4">
      <div className="flex bg-white px-4 py-1 rounded-3xl w-1/2">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="البحث عن صنف"
          inputProps={{ "aria-label": "البحث عن صنف" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

function Category() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [addFormData, setAddFormData] = useState({});

  // Create a function to receive data from NewCategoryForm
  const handleFormData = (data) => {
    console.log(data);
    axios
    .post("http://localhost:5000/category/new", data)
    .then((response) => {
      // Handle the response if needed
      console.log("POST request successful:", response.data);
    })
    .catch((error) => {
      // Handle errors if the request fails
      console.error("Error making POST request:", error);
    });

    // Update the state or perform actions with the data as needed
    setAddFormData(data);
  };

  useEffect(() => {
    console.log("xcxxx");
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

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleHideClick = () => {
    setShowAddForm(false);
  };
  
  return (
    <div className=" h-[92vh] overflow-auto">
      <CustomizedInputBase></CustomizedInputBase>
      <CategoryTable rows={categoryList}></CategoryTable>
      <div className=" absolute z-50 bottom-4 left-6">
        <Fab onClick={handleAddButtonClick} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </div>

      {showAddForm ? (
        <>
          {" "}
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewCategoryForm onFormSubmit={handleFormData}></NewCategoryForm>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Category;
