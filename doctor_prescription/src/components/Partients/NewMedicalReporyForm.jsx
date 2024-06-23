import React, { useEffect, useState } from "react";
import {
  // ... (your other imports)
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { CloseSharp, PrintRounded } from "@mui/icons-material";
import VoiceRecoed from "../../screens/global/VoiceRecoed";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
// import "quill/dist/quill.snow.css"; // Add css for snow theme
// import "quill/dist/quill.bubble.css"; // Add css for bubble theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import axios from "axios";
function NewMedicalReporyForm({
  onFormSubmit,
  partientsSelectId,
  onPrinterClick,
  type,
  data,
  medicalReportsStype,
  changeReportHeaderName,
  screenMode,
  handleExit
}) {
  const [headerName, setHeaderName] = useState(
    medicalReportsStype.reportHeaderName
  );
  // Define state to store form input data
  const [formData, setFormData] = useState({
    report: "",
    patientId: partientsSelectId,
  });
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });
  useEffect(() => {
    if (type === "edit") {
      setFormData({
        ...formData,
        report: data.report,
      });
    }
  }, []);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    changeReportHeaderName(headerName);
  }, [headerName]);
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
      className={`fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center ${
        screenMode ? "h-[100%] w-full p-4" : "w-3/5"
      } }  bg-white p-5 rounded-xl z-50`}
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      {screenMode ? (
        <div className=" flex justify-start items-start text-right w-full ">
          <IconButton
            onClick={() => {
              handleExit();
            }}
          >
            <CloseSharp className=" text-red-700  top-5 right-5"></CloseSharp>
          </IconButton>
        </div>
      ) : (
        ""
      )}
      <TextField
        value={headerName}
        size="small"
        sx={{ textAlign: "center" }}
        onChange={(e) => {
          setHeaderName(e.target.value);
        }}
      ></TextField>
      <div className=" text-right w-full">
        <h5>
          {" "}
          <FormattedMessage
            id={"Report information"}
            defaultMessage="Hello, World!"
          />
          {/* {props.userData} */}
        </h5>
      </div>
      <div style={{ direction: "ltr" }} className="w-full my-3">
        <Editor
          value={formData.report}
          className={`${screenMode ? "h-96" : "h-56"}   `}
          onTextChange={(e) => handleInputChange("report", e.htmlValue)}
        ></Editor>
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <div className="w-full" style={{ direction: "ltr" }}></div>
      </div>
      <div className="flex gap-6 w-full justify-between">
        <IconButton>
          {/* <PrintRounded color="action"></PrintRounded> */}
        </IconButton>

        <Button
          sx={{ width: "33%" }}
          type="submit"
          variant="contained"
          className="w-full"
          color="success"
        >
          <FormattedMessage
            id={"Add report information"}
            defaultMessage="Hello, World!"
          />
        </Button>
        <IconButton
          onClick={() => {
            onPrinterClick(formData.report);
          }}
        >
          <PrintRounded color="action"></PrintRounded>
        </IconButton>
      </div>{" "}
    </form>
  );
}

export default NewMedicalReporyForm;
