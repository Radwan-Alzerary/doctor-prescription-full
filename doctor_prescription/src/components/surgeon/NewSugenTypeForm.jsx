import React, { useEffect, useState } from "react";
import {
  // ... (your other imports)
  Button,
  TextField,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

function NewSugenTypeForm(props) {
  // Define state to store form input data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (props.type === "edit") {
      setFormData({
        ...formData,
        name: props.data.name,
        description: props.data.description,
      });
    }
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData
    props.onFormSubmit(formData);
  };

  // Handle changes in form fields
  const handleInputChange = async (name, value) => {
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
        <h5>معلومات الدواء</h5>
      </div>
      <div className="flex gap-4  w-full">
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          value={formData.name}
          onChange={(event) => handleInputChange("name", event.target.value)} // Update the name state
          id="outlined-required"
          size="small"
          sx={{
            width: "50%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="اسم العملية"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          dir="rtl"
          id="outlined-required"
          size="small"
          value={formData.description}
          onChange={(event) =>
            handleInputChange("description", event.target.value)
          } // Update the name state
          sx={{
            width: "100%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="الوصف"
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
        {props.type === "edit" ? (
          <FormattedMessage id={"edit"} defaultMessage="Hello, World!" />
        ) : (
          <FormattedMessage id={"new"} defaultMessage="Hello, World!" />
        )}
      </Button>
    </form>
  );
}

export default NewSugenTypeForm;
