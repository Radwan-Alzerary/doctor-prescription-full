import React, { useEffect, useState } from "react";
import {
  // ... (your other imports)
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CloseSharp, PrintRounded } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import axios from "axios";
import MedicalFormChipAutoComplete from "./MedicalFormChipAutoComplete";
import { red } from "@mui/material/colors";

function VisitForm({
  onFormSubmit,
  partientsSelectId,
  onPrinterClick,
  type,
  data,
  screenMode,
  handleExit,
  userEditData,
  settingData
}) {
  // Define state to store form input data
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    dateOfVisit: "",
    investigation: "",
    diagnosis: "",
    PriorChronicTherapy: "",
    CauseOfVisite: "",
    management: "",
    type: "",
    patientId: partientsSelectId,
    priority: "",
    chronicTherapy: "",
    analysis: "",
    riskFactor: "",
    pastMedicalHistory: "",
    drugHistory: "",
    suspendedDx: "",
  });
  useEffect(() => {
    if (type === "edit") {
      setFormData({
        ...formData,
        chiefComplaint: data.chiefComplaint,
        dateOfVisit: data.dateOfVisit,
        investigation: data.investigation,
        diagnosis: data.diagnosis,
        CauseOfVisite: data.CauseOfVisite,
        management: data.management,
        PriorChronicTherapy: data.PriorChronicTherapy,
        priority: data.priority,
        type: data.type,
        patientId: partientsSelectId,
        chronicTherapy: data.chronicTherapy,
        analysis: data.analysis,
        riskFactor: data.riskFactor,
        pastMedicalHistory: data.pastMedicalHistory,
        drugHistory: data.drugHistory,
        suspendedDx: data.suspendedDx,
      });
    }
  }, []);

  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [autoCompleteList, setAutoCompleteList] = useState();
  const [loading, setLoading] = useState(true);
  const [textSelector, setTextSelector] = useState("");

  useEffect(() => {
    const getAutoCompleteList = () => {
      axios
        .get(`${serverAddress}/autoComplete/getall/`)
        .then((response) => {
          setAutoCompleteList(response.data);
          setLoading(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getAutoCompleteList();
  }, []);

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
      className={`fixed flex flex-col items-center overflow-scroll left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5  ${
        screenMode ? "h-[100%] w-full p-4" : "w-3/5 h-[90%]"
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


      <div className=" text-right w-full">
        <h5>
          {" "}
          <FormattedMessage
            id={"visit Information"}
            defaultMessage="Hello, World!"
          />{" "}
          :{userEditData ? userEditData.name : ""}
        </h5>
      </div>




{settingData.visitForm ? settingData.visitForm.visitCauseOfVisite ?   
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        id="outlined-required"
        size="small"
        multiline
        value={formData.CauseOfVisite}
        onChange={(event) =>
          handleInputChange("CauseOfVisite", event.target.value)
        } // Update the name state
        onClick={() => {
          // Your click handler code here
          setTextSelector("CauseOfVisite");
        }}
        sx={{
          width: "100%",
          color: "#fff",
        }}
        label={
          <FormattedMessage
            id={"CauseOfVisite"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "CauseOfVisite" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitCauseOfVisite}
          formDataValue={formData.CauseOfVisite}
          handleInputChange={handleInputChange}
          target={"CauseOfVisite"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitPriorChronicTherapy ?  
   <div className="flex flex-col justify-center items-center gap-4  w-full">
   <TextField
   multiline
     id="outlined-required"
     size="small"
     value={formData.PriorChronicTherapy}
     onChange={(event) =>
       handleInputChange("PriorChronicTherapy", event.target.value)
     } // Update the name state
     sx={{
       width: "100%",
       color: "#fff",
     }}
     label={
       <FormattedMessage
         id={"PriorChronicTherapy"}
         defaultMessage="Hello, World!"
       />
     }
     onClick={() => {
       // Your click handler code here
       setTextSelector("PriorChronicTherapy");
     }}

     // defaultValue="Hello World"
   />
   {!loading && textSelector === "PriorChronicTherapy" ? (
     <MedicalFormChipAutoComplete
       AutoCompletevalue={autoCompleteList.visitPriorChronicTherapy}
       formDataValue={formData.PriorChronicTherapy}
       handleInputChange={handleInputChange}
       target={"PriorChronicTherapy"}
     ></MedicalFormChipAutoComplete>
   ) : (
     ""
   )}
 </div>  
: ""  : ""}

{settingData.visitForm ? settingData.visitForm.visitchiefComplaint ?   
<>
<div className="flex flex-col justify-center items-center gap-4  w-full">
        <TextField
          multiline
          id="outlined-required"
          size="small"
          value={formData.chiefComplaint}
          onClick={() => {
            // Your click handler code here
            setTextSelector("chiefComplaint");
          }}
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
        {!loading && textSelector === "chiefComplaint" ? (
          <MedicalFormChipAutoComplete
            AutoCompletevalue={autoCompleteList.visitchiefComplaint}
            formDataValue={formData.chiefComplaint}
            handleInputChange={handleInputChange}
            target={"chiefComplaint"}
          ></MedicalFormChipAutoComplete>
        ) : (
          ""
        )}
      </div>

</>
 : ""  : ""}
 {settingData.visitForm ? settingData.visitForm.visitInvestigation ?      
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
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
        onClick={() => {
          // Your click handler code here
          setTextSelector("investigation");
        }}
        label={
          <FormattedMessage
            id={"InvestigationFinding"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "investigation" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitinvestigation}
          formDataValue={formData.investigation}
          handleInputChange={handleInputChange}
          target={"investigation"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitDiagnosis ?    
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.diagnosis}
        onClick={() => {
          // Your click handler code here
          setTextSelector("diagnosis");
        }}
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
      {!loading && textSelector === "diagnosis" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitdiagnosis}
          formDataValue={formData.diagnosis}
          handleInputChange={handleInputChange}
          target={"diagnosis"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>
: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitManagement ?     
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.management}
        onChange={(event) =>
          handleInputChange("management", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("management");
        }}
        label={
          <FormattedMessage
            id={"management"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "management" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitManagement}
          formDataValue={formData.management}
          handleInputChange={handleInputChange}
          target={"management"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitChronicTherapy ?   
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.chronicTherapy}
        onChange={(event) =>
          handleInputChange("chronicTherapy", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("chronicTherapy");
        }}
        label={
          <FormattedMessage
            id={"chronicTherapy"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "chronicTherapy" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitChronicTherapy}
          formDataValue={formData.chronicTherapy}
          handleInputChange={handleInputChange}
          target={"chronicTherapy"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}

{settingData.visitForm ? settingData.visitForm.visitAnalysis ?  
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.analysis}
        onChange={(event) =>
          handleInputChange("analysis", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("analysis");
        }}
        label={
          <FormattedMessage id={"analysis"} defaultMessage="Hello, World!" />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "analysis" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitAnalysis}
          formDataValue={formData.analysis}
          handleInputChange={handleInputChange}
          target={"analysis"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}

{settingData.visitForm ? settingData.visitForm.visitRiskFactor ?  
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.riskFactor}
        onChange={(event) =>
          handleInputChange("riskFactor", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("riskFactor");
        }}
        label={
          <FormattedMessage
            id={"riskFactor"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "riskFactor" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitRiskFactor}
          formDataValue={formData.riskFactor}
          handleInputChange={handleInputChange}
          target={"riskFactor"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitPastMedicalHistory ?     
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.pastMedicalHistory}
        onChange={(event) =>
          handleInputChange("pastMedicalHistory", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("pastMedicalHistory");
        }}
        label={
          <FormattedMessage
            id={"pastMedicalHistory"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "pastMedicalHistory" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitPastMedicalHistory}
          formDataValue={formData.pastMedicalHistory}
          handleInputChange={handleInputChange}
          target={"pastMedicalHistory"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitDrugHistory ?     
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.drugHistory}
        onChange={(event) =>
          handleInputChange("drugHistory", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("drugHistory");
        }}
        label={
          <FormattedMessage
            id={"drugHistory"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "drugHistory" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitDrugHistory}
          formDataValue={formData.drugHistory}
          handleInputChange={handleInputChange}
          target={"drugHistory"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>

: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitSuspendedDx ?  
      <div className="flex flex-col justify-center items-center gap-4  w-full">
      <TextField
        multiline
        id="outlined-required"
        size="small"
        value={formData.suspendedDx}
        onChange={(event) =>
          handleInputChange("suspendedDx", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        onClick={() => {
          // Your click handler code here
          setTextSelector("suspendedDx");
        }}
        label={
          <FormattedMessage
            id={"suspendedDx"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      {!loading && textSelector === "suspendedDx" ? (
        <MedicalFormChipAutoComplete
          AutoCompletevalue={autoCompleteList.visitSuspendedDx}
          formDataValue={formData.suspendedDx}
          handleInputChange={handleInputChange}
          target={"suspendedDx"}
        ></MedicalFormChipAutoComplete>
      ) : (
        ""
      )}
    </div>
: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitType ?   

<FormControl className=" w-1/3 bg-whiteh" size="small">
<InputLabel id="demo-simple-select-helper-label">
  نوع الزيارة
</InputLabel>
<Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  // value={age}
  value={formData.type}
  onChange={(event) => handleInputChange("type", event.target.value)} // Update the name state
  label="الصنف"
  // onChange={handleAgeChange}
>
  <MenuItem value={"زيارة"}>زيارة</MenuItem>
  <MenuItem value={"مراجعة"}>مراجعة</MenuItem>
</Select>
</FormControl>  
: ""  : ""}
{settingData.visitForm ? settingData.visitForm.visitPriority ?     
      <FormControl className=" w-1/3 bg-whiteh" size="small">
      <InputLabel id="demo-simple-select-helper-label">الاولوية </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        // value={age}
        value={formData.priority}
        onChange={(event) =>
          handleInputChange("priority", event.target.value)
        } // Update the name state
        label="الاولوية"
        // onChange={handleAgeChange}
      >
        <MenuItem value={"normal"}>اعتيادية</MenuItem>
        <MenuItem value={"medium"} sx={{ backgroundColor: red[200] }}>
          متوسطة
        </MenuItem>
        <MenuItem value={"high"} sx={{ backgroundColor: red[300] }}>
          عالية
        </MenuItem>
        <MenuItem
          className=" bg-red-200"
          sx={{ backgroundColor: red[400] }}
          value={"dangers"}
        >
          خطيرة
        </MenuItem>
      </Select>
    </FormControl>

: ""  : ""}


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
