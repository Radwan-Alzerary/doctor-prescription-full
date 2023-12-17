import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
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
  const handleChildrenDataChange = (childIndex, property, value) => {
    const updatedChildrenData = [...formData.MiscarriageData];
    updatedChildrenData[childIndex] = {
      ...updatedChildrenData[childIndex],
      [property]: value,
    };

    setFormData({
      ...formData,
      MiscarriageData: updatedChildrenData,
    });
  };
  const renderChildFields = () => {
    const childFields = [];

    for (let i = 0; i < formData.MiscarriageNo; i++) {
      childFields.push(
        <div key={i} className="flex flex-col gap-4">
          <TextField
            id={`child-reason-${i}`}
            size="small"
            value={formData.MiscarriageData[i]?.reason || ""}
            onChange={(event) =>
              handleChildrenDataChange(i, "reason", event.target.value)
            }
            label={`${i + 1} سبب الاسقاطات`}
            sx={{
              textAlign: "right",
              color: "#fff",
            }}
            InputProps={{
              style: { textAlign: "right" },
            }}
          />

          <TextField
            id={`child-date-${i}`}
            size="small"
            value={formData.MiscarriageData[i]?.date || ""}
            onChange={(event) =>
              handleChildrenDataChange(i, "date", event.target.value)
            }
            sx={{
              textAlign: "right",
              color: "#fff",
            }}
            type="date"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
        </div>
      );
    }

    return childFields;
  };

  return (
    <form
      className="fixed flex flex-col overflow-scroll h-[90%] left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
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

      <TextField
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
        // defaultValue="Hello World"
      />
      <TextField
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
        // defaultValue="Hello World"
      />
      <TextField
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
        // defaultValue="Hello World"
      />
      <TextField
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
        // defaultValue="Hello World"
      />
      <p> اسقاط حمل</p>
      <FormControlLabel
        sx={{
          display: "block",
        }}
        control={
          <Switch
            checked={formData.miscarriageState}
            onChange={(event) => {
              handleInputChange("miscarriageState", !formData.miscarriageState);
            }}
            color="primary"
          />
        }
      />
      {formData.miscarriageState ? (
        <>
          <TextField
            value={formData.MiscarriageNo}
            onChange={(event) => {
              handleInputChange("MiscarriageNo", event.target.value);
            }}
            id="outlined-multiline-static"
            size="small"
            sx={{
              width: "100%",
              color: "#fff",
            }}
            type="number"
            multiline
            // label={
            //   <FormattedMessage
            //     id={"bloodSugar"}
            //     defaultMessage="Hello, World!"
            //   />
            // }
            label={"عدد الاسقاطات"}
            // defaultValue="Hello World"
          />
          <div className="flex gap-4 flex-wrap">{renderChildFields()}</div>
        </>
      ) : (
        ""
      )}
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
          <FormattedMessage
            id={"add patient page"}
            defaultMessage="Hello, World!"
          />
        </Button>
        {/* <IconButton onClick={props.onPrinterClick}>
          <PrintRounded color="action"></PrintRounded>
        </IconButton> */}
      </div>
    </form>
  );
}

export default MedicalForm;
