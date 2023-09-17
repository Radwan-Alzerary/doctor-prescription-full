import React, { useState } from "react";
import {
  // ... (your other imports)
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function NewMedicalReports({ onFormSubmit }) {
  // Define state to store form input data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData
    onFormSubmit(formData);
  };

  // Handle changes in form fields
  const handleInputChange = (name, value) => {
    // Update the formData state with the input data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
    >
      <div className=" text-right w-full">
        <h5>معلومات التقرير</h5>
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">
            اسم المريض{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
          >
            <MenuItem value="">
              <em>الكل</em>
            </MenuItem>
            {/* <MenuItem value={10}>اليوم</MenuItem>
            <MenuItem value={20}>اسبوع</MenuItem>
            <MenuItem value={20}>شهر</MenuItem>
            <MenuItem value={30}>سنه</MenuItem> */}
          </Select>
        </FormControl>

        <TextField
          dir="rtl"
          id="outlined-required"
          size="small"
          onChange={(event) =>
            handleInputChange("description", event.target.value)
          } // Update the name state
          sx={{
            width: "100%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="التقرير"
          multiline
          rows={3}
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
      </div>{" "}
      <Button
        type="submit"
        variant="contained"
        className="w-full"
        color="success"
      >
        اضافة تقرير
      </Button>
    </form>
  );
}

export default NewMedicalReports;
