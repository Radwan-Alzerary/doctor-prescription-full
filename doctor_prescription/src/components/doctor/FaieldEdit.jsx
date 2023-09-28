import { Button, TextField, Input } from "@mui/material";
import React, { useEffect, useState } from "react";

function FaieldEdit({ onFormSubmit, editFormTarget,editFormData }) {
  const [formData, setFormData] = useState({ });
const [value,setValue] = useState("")
  useEffect(()=>{
    setValue(editFormData)
    setFormData({
      ...formData,
      [editFormTarget]: editFormData,
    }
    );
  
  },[])
console.log(formData)
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData and selectedImage
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

  // Handle image input change

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
    >
      <div className="text-right w-full">
        <h5>{editFormTarget}</h5>
      </div>
      
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <TextField
          dir="rtl"
          id="outlined-required"
          size="small"
          value={value}
          onChange={(event) => {handleInputChange(editFormTarget, event.target.value) 
          setValue(event.target.value)}} // Update the name state
          sx={{
            width: "100%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="المعلومات"
          multiline
          rows={3}
          InputProps={{
            style: { textAlign: "right" },
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

export default FaieldEdit;
