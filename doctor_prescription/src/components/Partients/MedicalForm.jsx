import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function MedicalForm(props) {
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
    // Call the onFormSubmit function passed as a prop with the formData
    props.onFormSubmit(formData);
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
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}

    >
      <div className="w-full flex gap-9"></div>
      <div className=" text-right w-full">
        <h5>
          {" "}
          <FormattedMessage
            id={"Medical Diagnosis"}
            defaultMessage="Hello, World!"
          />
        </h5>
      </div>
      <TextField
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

        <Button
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
          className="w-full"
          color="success"
        >
          اضافة طبلة للمريض
        </Button>
        {/* <IconButton onClick={props.onPrinterClick}>
          <PrintRounded color="action"></PrintRounded>
        </IconButton> */}
      </div>
    </form>
  );
}

export default MedicalForm;
