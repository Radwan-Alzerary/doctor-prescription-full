import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createFilterOptions,
} from "@mui/material";
import BillTable from "./BillTable";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { PrintRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import { DateTimePicker } from "@mui/x-date-pickers";
function EditPartients(props) {
  const [value, setValue] = useState("");
  const [pharmaceuticalInputs, setPharmaceuticalInputs] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [dose, setDose] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [billId, setBillId] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [doseNumFirst, setDoseNumFirst] = useState("");
  const [doseNumSecend, setDoseNumSecend] = useState("");
  const [inTakeTime, setInTakeTime] = useState("");
  const [inTakeTimeOther, setInTakeTimeOther] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState([]);
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handeAddBill = () => {
    const dataBillForm = {};
    dataBillForm.dose = dose;
    dataBillForm.billId = billId;
    dataBillForm.tradeName = tradeName;
    dataBillForm.billName = inputValue;
    dataBillForm.doseNum = `${doseNumFirst}*${doseNumSecend}`;
    dataBillForm.inTakeTime = inTakeTime;
    dataBillForm.inTakeTimeOther = inTakeTimeOther;
    dataBillForm.description = description;
    dataBillForm.partientId = props.partientId;
    dataBillForm.PrescriptionId = props.PrescriptionId;
    props.onBillAdded(dataBillForm);
  };
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    matchFrom: "start",
    limit: 20,
  });

  useEffect(() => {
    console.log(inputValue);
    if (value !== null && typeof value === "object" && "_id" in value) {
      setBillId(value._id);
      if (value.dose) {
        setDose(value.dose);
      }
      if (value.tradeName) {
        setTradeName(value.tradeName);
      }
    }

    if (value && value.intaketime) {
      setInTakeTime(value.intaketime._id);
      setShowInTakeOtherInput(false);
    } else {
      if (value && value.anotherIntaketime) {
        setInTakeTimeOther(value.anotherIntaketime);
      }
      setInTakeTime("other");
      setShowInTakeOtherInput(true);
    }

    if (value && value.doseCount) {
      const parts = value.doseCount.split("*");
      console.log(value);
      if (parts.length === 2) {
        setDoseNumFirst(parts[0]);
        setDoseNumSecend(parts[1]);
        setPharmaceuticalInputs(true);
      } else {
        console.error("Invalid value.doseCount format:", value.doseCount);
      }
    } else {
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
    prescriptionData.patientId = props.patientId;
    prescriptionData.diagnosis = diagnosis;
    prescriptionData.nextVisit = nextVisit;

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
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
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
        onChange={(event) => {
          setDiagnosis(event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        multiline
        rows={1}
        label={
          <FormattedMessage
            id={"Medical Diagnosis"}
            defaultMessage="Hello, World!"
          />
        }
        // defaultValue="Hello World"
      />
      <div className="w-full">
        <h5>
          {" "}
          <FormattedMessage
            id={"NextVisitDate"}
            defaultMessage="Hello, World!"
          />
        </h5>
        <LocalizationProvider
          size="small"
          className=" w-full"
          dateAdapter={AdapterDayjs}
        >
          <DateTimePicker
            onChange={(newValue) => setNextVisit(newValue.$d)}
            className="w-full"
          />
        </LocalizationProvider>
      </div>

      <div className=" text-right flex w-full gap-[74%]">
        <h5>
          <FormattedMessage
            id={"prescription"}
            defaultMessage="Hello, World!"
          />
        </h5>
        <h5>
          {" "}
          <FormattedMessage id={"No.dosage"} defaultMessage="Hello, World!" />
        </h5>
      </div>
      <div className="w-full ">
        <div className="">
          <div className="flex gap-4 justify-center mb-2 items-center">
            <Autocomplete
              freeSolo
              size="small"
              disableListWrap
              disablePortal
              id="combo-box-demo"
              options={props.pharmaceList}
              getOptionLabel={(option) => {
                return `${option.name} ${
                  option.tradeName ? `(${option.tradeName})` : ""
                }`;
              }}
              filterOptions={filterOptions}
              sx={{ width: "33%" }}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setValue(null);
                setBillId("");
                setInputValue(newInputValue);
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value || option.tradeName === value
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <FormattedMessage
                      id={"Drug name"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
              )}
            />
            {pharmaceuticalInputs ? (
              <>
                <TextField
                  id="outlined-required"
                  size="small"
                  value={tradeName}
                  onChange={(event) => {
                    setTradeName(event.target.value);
                  }} // Update the name state
                  sx={{
                    width: "42%",
                    color: "#fff",
                  }}
                  label={
                    <FormattedMessage
                      id={"Trade name"}
                      defaultMessage="Hello, World!"
                    />
                  }
                  // defaultValue="Hello World"
                />

                <TextField
                  id="outlined-required"
                  size="small"
                  value={dose}
                  onChange={(event) => {
                    setDose(event.target.value);
                    // handleBillInputChange("dose", event.target.value);
                  }} // Update the name state
                  sx={{
                    width: "42%",
                    color: "#fff",
                  }}
                  label={
                    <FormattedMessage
                      id={"Dosage"}
                      defaultMessage="Hello, World!"
                    />
                  }
                  // defaultValue="Hello World"
                />
                {/* First TextField */}

                <TextField
                  id="outlined-required"
                  size="small"
                  value={doseNumSecend}
                  onChange={(event) => {
                    setDoseNumSecend(event.target.value);
                  }}
                  sx={{
                    width: "10%",
                    color: "#fff",
                  }}
                />
                <span>X</span>
                <TextField
                  id="outlined-required"
                  size="small"
                  value={doseNumFirst}
                  onChange={(event) => {
                    setDoseNumFirst(event.target.value);
                  }}
                  sx={{
                    width: "10%",
                    color: "#fff",
                  }}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between gap-3">
            {pharmaceuticalInputs ? (
              <>
                <FormControl className=" w-1/3 bg-whiteh" size="small">
                  <InputLabel id="demo-simple-select-helper-label">
                    <FormattedMessage
                      id={"Take time"}
                      defaultMessage="Hello, World!"
                    />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={inTakeTime}
                    label={
                      <FormattedMessage
                        id={"Take time"}
                        defaultMessage="Hello, World!"
                      />
                    }
                    onChange={(event) => {
                      setInTakeTime(event.target.value);

                      handleInTakeTimeInputChange(event.target.value);
                    }} // Update the name state
                  >
                    {props.inTakeTimeList.map((inTakeTime, index) => (
                      <MenuItem value={inTakeTime._id}>
                        {inTakeTime.name}
                      </MenuItem>
                    ))}
                    <MenuItem value={"other"}>
                      {" "}
                      <FormattedMessage
                        id={"other"}
                        defaultMessage="Hello, World!"
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
                {showInTakeOtherInput ? (
                  <TextField
                    id="outlined-required"
                    size="small"
                    value={inTakeTimeOther}
                    onChange={(event) => {
                      setInTakeTimeOther(event.target.value);
                    }} // Update the name state
                    sx={{
                      width: "33%",
                      color: "#fff",
                    }}
                    label={
                      <FormattedMessage
                        id={"time to take"}
                        defaultMessage="Hello, World!"
                      />
                    }

                    // defaultValue="Hello World"
                  />
                ) : (
                  ""
                )}

                <TextField
                  id="outlined-multiline-static"
                  size="small"
                  sx={{
                    width: "33%",
                    color: "#fff",
                  }}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  label={
                    <FormattedMessage
                      id={"Notes"}
                      defaultMessage="Hello, World!"
                    />
                  }
                  // defaultValue="Hello World"
                />
              </>
            ) : (
              ""
            )}

            <Button
              sx={{ width: "33%" }}
              variant="contained"
              className="w-full"
              color="success"
              onClick={handeAddBill}
            >
              <FormattedMessage
                id={"Adding medication"}
                defaultMessage="Hello, World!"
              />
            </Button>
          </div>
        </div>
      </div>
      <BillTable
        midscapeData={props.midscapeData}
        onBillInsideRemove={props.onBillInsideRemove}
        pharmaceList={props.pharmaceListInside}
      ></BillTable>
      {props.userData && props.userData.length > 0 ? (
        <div>
          المريض يعاني حساسية من :{" "}
          <span className=" text-red-700">{props.userData}</span>
        </div>
      ) : (
        ""
      )}
      {props.midscapeData && props.midscapeData.length > 0 ? (
        <p className="text-left text-sm text-red-700">
          {props.midscapeData.map((midscapedata) => midscapedata.text)}
        </p>
      ) : (
        ""
      )}
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
            id={"Add a prescription"}
            defaultMessage="Hello, World!"
          />
        </Button>
        <IconButton onClick={props.onPrinterClick}>
          <PrintRounded color="action"></PrintRounded>
        </IconButton>
      </div>
    </form>
  );
}

export default EditPartients;
