import React, { useEffect, useState } from "react";
import {
  // ... (your other imports)
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { PrintRounded } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";

function VisitForm({
  onFormSubmit,
  partientsSelectId,
  onPrinterClick,
  type,
  data,
}) {
  // Define state to store form input data
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    dateOfVisit: "",
    investigation: "",
    diagnosis: "",
    patientId: partientsSelectId,
  });
  useEffect(() => {
    if (type === "edit") {
      setFormData({
        ...formData,
        chiefComplaint: data.chiefComplaint,
        dateOfVisit: data.dateOfVisit,
        investigation: data.investigation,
        diagnosis: data.diagnosis,
      });
    }
  }, []);

  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData
    console.log(formData);
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
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div className=" text-right w-full">
        <h5>
          {" "}
          <FormattedMessage
            id={"visit Information"}
            defaultMessage="Hello, World!"
          />
        </h5>
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <TextField
          id="outlined-required"
          size="small"
          value={formData.chiefComplaint}
          onChange={(event) =>
            handleInputChange("chiefComplaint", event.target.value)
          } // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"Diagnostic Details"}
              defaultMessage="Hello, World!"
            />
          }
          // defaultValue="Hello World"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <TextField
          id="outlined-required"
          size="small"
          value={formData.investigation}
          onChange={(event) =>
            handleInputChange("investigation", event.target.value)
          } // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"InvestigationFinding"}
              defaultMessage="Hello, World!"
            />
          }
          // defaultValue="Hello World"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <TextField
          id="outlined-required"
          size="small"
          value={formData.diagnosis}
          onChange={(event) =>
            handleInputChange("diagnosis", event.target.value)
          } // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"diagnosis"} defaultMessage="Hello, World!" />
          }
          // defaultValue="Hello World"
        />
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
          {type === "edit" ? (
            <FormattedMessage
              id={"edit visit"}
              defaultMessage="Hello, World!"
            />
          ) : (
            <FormattedMessage
              id={"add new visit"}
              defaultMessage="Hello, World!"
            />
          )}
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

export default VisitForm;


