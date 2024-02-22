import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ImageInput from "../ImageInput";
import { useState } from "react";
import ImageView from "./ImageView";
import BackGroundShadow from "../../pageCompond/BackGroundShadow";

export default function PatientPictures(props) {
  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [imageSelector, setImageSelector] = useState("");
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

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
      const response = await fetch(`${serverAddress}/patients/galaryimage/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFile(null);
        props.refreshPaitent();
        console.log("xx");
      } else {
        // alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handelImageView = (imageUrl) => {
    setShowImage(true);
    setImageSelector(imageUrl);
    console.log(imageUrl);
  };
  const handleHideImage = () => {
    setShowImage(false);
  };
  return (
    <div style={{ width: "100%" }} className=" overflow-scroll p-3 ">
      <div className=" w-full grid grid-cols-3 gap-4 ">
        {props.images.map((value) => (
          <div>
            <img
              alt="2"
              onClick={() => {
                handelImageView(`${serverAddress}/${value}`);
              }}
              className=" w-full  h-80 object-cover"
              src={`${serverAddress}/${value}`}
            ></img>
          </div>
        ))}
        <ImageInput handleFileChange={handleFileChange}></ImageInput>
      </div>
      {showImage ?<>
        <ImageView imageSelector={imageSelector} handleHideImage={handleHideImage}></ImageView> 
      </>: ""}
    </div>
  );
}
