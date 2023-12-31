import React, { useEffect, useState } from "react";
import {
  // ... (your other imports)
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { PrintRounded } from "@mui/icons-material";
import VoiceRecoed from "../../screens/global/VoiceRecoed";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";

function EditMedicalReporyForm(props) {
  // Define state to store form input data
  const [formData, setFormData] = useState({
    report: "",
  });

  useEffect(() => {
    if (props.type === "edit") {
      setFormData({
        ...formData,
        report: props.data.report,
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
    props.onFormSubmit(formData);
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
            id={"Report information"}
            defaultMessage="Hello, World!"
          />
        </h5>
      </div>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <TextField
          id="outlined-required"
          size="small"
          onChange={(event) => handleInputChange("report", event.target.value)} // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Report"} defaultMessage="Hello, World!" />
          }
          multiline
          rows={3}
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
          <FormattedMessage
            id={"Add report information"}
            defaultMessage="Hello, World!"
          />
        </Button>
        <IconButton
          onClick={() => {
            props.onPrinterClick(formData.report);
          }}
        >
          <PrintRounded color="action"></PrintRounded>
        </IconButton>
        {/* <VoiceRecoed setInputValue={setFormData} /> */}
      </div>{" "}
    </form>
  );
}

export default EditMedicalReporyForm;
