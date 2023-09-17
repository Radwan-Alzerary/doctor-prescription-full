import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

function AddCashir(props) {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onCashireFormSubmit(formData);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      className="h-full"
    >
      <div>
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.userName}
          onChange={(event) => {
            handleInputChange("userName", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="اسم السكرتير"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.email}
          onChange={(event) => {
            handleInputChange("email", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="الايميل"
          type="email"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.password}
          onChange={(event) => {
            handleInputChange("password", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          type="password"
          label="الرمز"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="w-full"
        color="success"
      >
        تعديل المعلومات
      </Button>
    </form>
  );
}

export default AddCashir;
