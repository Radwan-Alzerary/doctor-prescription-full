import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import BillTable from "./BillTable";
import { PrintRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

function MedicalForm(props) {
  const [value, setValue] = useState("");
  const [pharmaceuticalInputs, setPharmaceuticalInputs] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [dose, setDose] = useState("");
  const [billId, setBillId] = useState("");
  const [doseNumFirst, setDoseNumFirst] = useState("");
  const [doseNumSecend, setDoseNumSecend] = useState("");
  const [inTakeTime, setInTakeTime] = useState("");
  const [inTakeTimeOther, setInTakeTimeOther] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);

  const handeAddBill = () => {
    const dataBillForm = {};
    dataBillForm.dose = dose;
    dataBillForm.billId = billId;
    dataBillForm.billName = inputValue;
    dataBillForm.doseNum = `${doseNumFirst}*${doseNumSecend}`;
    dataBillForm.inTakeTime = inTakeTime;
    dataBillForm.inTakeTimeOther = inTakeTimeOther;
    dataBillForm.description = description;
    dataBillForm.partientId = props.partientId;
    dataBillForm.PrescriptionId = props.PrescriptionId;
    props.onBillAdded(dataBillForm);
  };

  useEffect(() => {
    console.log(inputValue);
    if (value !== null && typeof value === "object" && "_id" in value) {
      setBillId(value._id);
      if (value.dose) {
        setDose(value.dose);
      }
    }
    if (value && value.doseCount) {
      const parts = value.doseCount.split("*");
      if (value.intaketime) {
        setInTakeTime(value.intaketime);
        setShowInTakeOtherInput(false);
      } else {
        setInTakeTimeOther(value.anotherIntaketime);
        setInTakeTime("other");
        setShowInTakeOtherInput(true);
      }

      if (parts.length === 2) {
        setDoseNumFirst(parts[0]);
        setDoseNumSecend(parts[1]);
        setPharmaceuticalInputs(true);
      } else {
        // Handle the case where value.doseCount doesn't have the expected format
        console.error("Invalid value.doseCount format:", value.doseCount);
      }
    } else {
      // Handle the case where value or value.doseCount is undefined
      console.error("Invalid value or value.doseCount:", value);
    }
  }, [value, inputValue]);

  const [showInTakeOtherInput, setShowInTakeOtherInput] = useState(false);
  const handleInTakeTimeInputChange = (value) => {
    if (value === "other") {
      setShowInTakeOtherInput(true);
    } else {
      setShowInTakeOtherInput(false);
    }
  };

  const handleSubmit = (event) => {
    const prescriptionData = {};
    prescriptionData.id = props.PrescriptionId;
    prescriptionData.diagnosis = diagnosis;
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData
    props.onFormSubmit(prescriptionData);
  };

  // Handle changes in form fields
  console.log(props.partientId);
  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
      <div className="w-full flex gap-9"></div>
      <div className=" text-right w-full">
        <h5>التشخيص الطبي</h5>
      </div>
      <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="تفاصيل التشخيص"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
       <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ الحالي "
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
      <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ المرضي "
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
      <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="العمليات الجراحية السابقة"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ العائلي"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <TextField
        dir="rtl"
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التحسس من الادوية"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />


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
          اضافة وصفة طبية
        </Button>
        <IconButton onClick={props.onPrinterClick}>
          <PrintRounded color="action"></PrintRounded>
        </IconButton>
      </div>
    </form>
  );
}

export default MedicalForm;
