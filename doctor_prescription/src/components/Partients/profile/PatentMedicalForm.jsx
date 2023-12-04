import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function PatentMedicalForm(props) {
  const [formData, setFormData] = useState({});
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  useEffect(() => {
    const { diseases, ...formDataWithoutDiseases } = props.userEditData;
    setFormData(formDataWithoutDiseases);
    // console.log(formDataWithoutDiseases)
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Handle changes in form fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form
      className="flex w-full flex-col overflow-scroll gap-5 items-center bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div className="w-full flex gap-9"></div>
      <TextField
      disabled
        value={formData.medicalDiagnosis}
        onChange={(event) => {
          handleInputChange("medicalDiagnosis", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Diagnostic Details"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      <TextField
        value={formData.currentMedicalHistory}
        disabled
        onChange={(event) => {
          handleInputChange("currentMedicalHistory", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Present Medical History"}
            defaultMessage="Hello, World!"
          />
        }
      />

      <TextField
        value={formData.medicalHistory}
        disabled
        onChange={(event) => {
          handleInputChange("medicalHistory", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Medical History"}
            defaultMessage="Hello, World!"
          />
        } // defaultValue="Hello World"
      />

      <TextField
        value={formData.previousSurgeries}
        disabled
        onChange={(event) => {
          handleInputChange("previousSurgeries", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Previous Surgical Procedures"}
            defaultMessage="Hello, World!"
          />
        } // defaultValue="Hello World"        Present Medical History
      />

      <TextField
        value={formData.familyHistory}
        disabled
        onChange={(event) => {
          handleInputChange("familyHistory", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Family Medical History"}
            defaultMessage="Hello, World!"
          />
        }
        Diagnostic
        Details
        // defaultValue="Hello World"
      />

      <TextField
        value={formData.fumbling}
        disabled
        onChange={(event) => {
          handleInputChange("fumbling", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={
          <FormattedMessage
            id={"Medication Allergies"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />

      <div className="flex gap-6 w-full justify-between">
        <IconButton>
          {/* <PrintRounded color="action"></PrintRounded> */}
        </IconButton>

      </div>
    </form>
  );
}

export default PatentMedicalForm;
