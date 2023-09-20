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
import { FormattedMessage } from "react-intl";

function NewPartientsForm(props) {
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
      <div className="w-full flex gap-9">
        {/* <div className=" w-2/6">
          <div className=" text-right w-full">
            <h5 className="pb-5">اسم المريض</h5>
          </div>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={props.patientsList}
            getOptionLabel={(option) => option.name} // Specify the field to use as the label
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="الاسم" />}
            renderOption={(props, option) => (
              <li {...props}>{option.name}</li> // Display the "name" field as the option label
            )}
          />
        </div> */}
      </div>
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
        rows={1}
        label="التشخيص النهائي"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <div className=" text-right flex w-full gap-[50%]">
        <h5>الوصفة الطبية</h5>
        <h5>عدد الجرعات</h5>
      </div>
      <div className="w-full ">
        <div className="">
          <div className="flex gap-2 justify-center mb-2 items-center">
            <Autocomplete
              freeSolo
              size="small"
              disablePortal
              id="combo-box-demo"
              options={props.pharmaceList}
              getOptionLabel={(option) => option.name} // Specify the field to use as the label
              sx={{ width: "33%" }}
              //   value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setValue(null);
                setBillId("");
                setInputValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="الدواء" />}
            />
            {pharmaceuticalInputs ? (
              <>
                <TextField
                  dir="rtl"
                  required
                  id="outlined-required"
                  size="small"
                  value={dose}
                  onChange={(event) => {
                    setDose(event.target.value);
                    // handleBillInputChange("dose", event.target.value);
                  }} // Update the name state
                  sx={{
                    width: "42%",
                    direction: "rtl",
                    textAlign: "right",
                    color: "#fff",
                  }}
                  label="الجرعة"
                  // defaultValue="Hello World"
                  InputProps={{
                    style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
                  }}
                />
                {/* First TextField */}

                <TextField
                  dir="rtl"
                  required
                  id="outlined-required"
                  size="small"
                  value={doseNumSecend}
                  onChange={(event) => {
                    setDoseNumSecend(event.target.value);
                  }}
                  sx={{
                    width: "41%",
                    direction: "rtl",
                    textAlign: "right",
                    color: "#fff",
                  }}
                  InputProps={{
                    style: { textAlign: "right" },
                  }}
                />
                <span>X</span>
                <TextField
                  dir="rtl"
                  required
                  id="outlined-required"
                  size="small"
                  value={doseNumFirst}
                  onChange={(event) => {
                    setDoseNumFirst(event.target.value);
                  }}
                  sx={{
                    width: "41%",
                    direction: "rtl",
                    textAlign: "right",
                    color: "#fff",
                  }}
                  InputProps={{
                    style: { textAlign: "right" },
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
                    وقت التناول
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={inTakeTime}
                    label="وقت التناول"
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
                    <MenuItem value={"other"}>اخرى</MenuItem>
                  </Select>
                </FormControl>
                {showInTakeOtherInput ? (
                  <TextField
                    dir="rtl"
                    required
                    id="outlined-required"
                    size="small"
                    value={inTakeTimeOther}
                    onChange={(event) => {
                      setInTakeTimeOther(event.target.value);
                    }} // Update the name state
                    sx={{
                      width: "33%",
                      direction: "rtl",
                      textAlign: "right",
                      color: "#fff",
                    }}
                    label="ادخل وقت التناول"
                    // defaultValue="Hello World"
                    InputProps={{
                      style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
                    }}
                  />
                ) : (
                  ""
                )}

                <TextField
                  dir="rtl"
                  id="outlined-multiline-static"
                  size="small"
                  sx={{
                    width: "33%",
                    direction: "rtl",
                    textAlign: "right",
                    color: "#fff",
                  }}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  label="ملاحضات اضافية"
                  // defaultValue="Hello World"
                  InputProps={{
                    style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
                  }}
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
              اضافة الدواء
            </Button>
          </div>
        </div>
      </div>

      <BillTable
        onBillInsideRemove={props.onBillInsideRemove}
        pharmaceList={props.pharmaceListInside}
      ></BillTable>
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

export default NewPartientsForm;
