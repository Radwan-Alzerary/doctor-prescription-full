import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ImageInput from "../ImageInput";
import { useState } from "react";

export default function PatientPictures(props) {
  const [file, setFile] = useState(null);
  const handleFileChange = async (file) => {
    const selectedFile = file;
    setFile(selectedFile);
    console.log(file);
    console.log(file);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", props.id);

    try {
      const response = await fetch(
        "http://localhost:5000/patients/galaryimage/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFile(null);
        props.refreshPaitent()
        console.log("xx");
      } else {
        // alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div style={{ width: "100%" }} className=" overflow-scroll p-3 ">
      <div className=" w-full grid grid-cols-3 gap-4 ">
        {props.images.map((value) => (
          <img
            alt="2"
            className=" w-full  h-80 object-cover"
            src={`http://localhost:5000/${value}`}
            ></img>
        ))}
        <ImageInput handleFileChange={handleFileChange}></ImageInput>
      </div>
    </div>
  );
}
