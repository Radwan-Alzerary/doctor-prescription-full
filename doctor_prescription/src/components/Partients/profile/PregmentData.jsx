import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function PregmentData(props) {
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
  <TextField
  disabled
        value={formData.InvestigationFinding}
        onChange={(event) => {
          handleInputChange("InvestigationFinding", event.target.value);
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
            id={"InvestigationFinding"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      <TextField
      disabled
        value={formData.fractures}
        onChange={(event) => {
          handleInputChange("fractures", event.target.value);
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
          <FormattedMessage id={"fractures"} defaultMessage="Hello, World!" />
        }
        // defaultValue="Hello World"
      />
      <TextField
      disabled
        value={formData.ExaminationFindining}
        onChange={(event) => {
          handleInputChange("ExaminationFindining", event.target.value);
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
            id={"ExaminationFindining"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      <TextField
      disabled
        value={formData.ExaminationFindining}
        onChange={(event) => {
          handleInputChange("ExaminationFindining", event.target.value);
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
            id={"ExaminationFindining"}
            defaultMessage="Hello, World!"
          />
        }
      />
      <TextField
      disabled
        value={formData.pulseRate}
        onChange={(event) => {
          handleInputChange("pulseRate", event.target.value);
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
          <FormattedMessage id={"pulseRate"} defaultMessage="Hello, World!" />
        }
      />
      <TextField
      disabled
        value={formData.spo2}
        onChange={(event) => {
          handleInputChange("spo2", event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={2}
        label={<FormattedMessage id={"spo2"} defaultMessage="Hello, World!" />}
      />
      <TextField
      disabled
        value={formData.temperature}
        onChange={(event) => {
          handleInputChange("temperature", event.target.value);
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
          <FormattedMessage id={"temperature"} defaultMessage="Hello, World!" />
        }
      />
      <TextField
      disabled
        value={formData.bloodPressure}
        onChange={(event) => {
          handleInputChange("bloodPressure", event.target.value);
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
            id={"bloodPressure"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      <TextField
      disabled
        value={formData.bloodSugar}
        onChange={(event) => {
          handleInputChange("bloodSugar", event.target.value);
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
          <FormattedMessage id={"bloodSugar"} defaultMessage="Hello, World!" />
        }
      />
      <div className="flex gap-6 w-full justify-between">
        <IconButton>
          {/* <PrintRounded color="action"></PrintRounded> */}
        </IconButton>
      </div>
    </form>
  );
}

export default PregmentData;
