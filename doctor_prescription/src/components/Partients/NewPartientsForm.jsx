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

import { CloseSharp, PrintRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MedicalFormChipAutoComplete from "./MedicalFormChipAutoComplete";
import axios from "axios";
function EditPartients(props) {
  const [value, setValue] = useState("");
  const [pharmaceuticalInputs, setPharmaceuticalInputs] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [dose, setDose] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [billId, setBillId] = useState("");
  const [group, setGroup] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [doseNumFirst, setDoseNumFirst] = useState("");
  const [doseNumSecend, setDoseNumSecend] = useState("");
  const [inTakeTime, setInTakeTime] = useState("");
  const [inTakeTimeOther, setInTakeTimeOther] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });
  const [autoCompleteList, setAutoCompleteList] = useState();
  const [loading, setLoading] = useState(true);
  const [pharmGroupSelected, setPharmGroupSelected] = useState("");
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  useEffect(() => {
    const getAutoCompleteList = () => {
      axios
        .get(`${serverAddress}/autoComplete/getall/`)
        .then((response) => {
          setAutoCompleteList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getAutoCompleteList();
  }, []);

  const handeAddBill = () => {
    const dataBillForm = {};
    dataBillForm.dose = dose;
    dataBillForm.x = dose;
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
    setDose("");
    setTradeName("");
    setDoseNumFirst("");
    setDoseNumSecend("");
    setInTakeTime("");
    setInTakeTimeOther("");
    setDescription("");
    setValue("");

    setInputValue("");
  };
  const handeAddGroupBill = (groups) => {
    if (groups && Array.isArray(groups.pharmaceutical)) {
      groups.pharmaceutical.forEach((group) => {
        const dataBillForm = {};
        axios
          .get(`${serverAddress}/pharmaceutical/getone/${group._id}`)
          .then((response) => {
            dataBillForm.dose = response.data.dose;
            dataBillForm.x = response.data.dose;
            dataBillForm.billId = response.data._id;
            dataBillForm.tradeName = response.data.tradeName;
            dataBillForm.billName = response.data.inputValue;
            dataBillForm.doseNum = response.data.doseCount;
            dataBillForm.inTakeTime = response.data.inTakeTime;
            dataBillForm.inTakeTimeOther = response.data.inTakeTimeOther;
            dataBillForm.description = response.data.description;
            dataBillForm.PrescriptionId = props.PrescriptionId;
            props.onBillGroupAdded(dataBillForm);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });

        // Assuming you want to log each item in the pharmaceutical group
      });
    } else {
      console.error("Invalid groups data or pharmaceutical group not found.");
      return; // Exit the function early to prevent further errors
    }

    // const dataBillForm = {};
    // dataBillForm.billId = billId;
    // props.onBillAdded(dataBillForm);
    setDose("");
    setTradeName("");
    setDoseNumFirst("");
    setDoseNumSecend("");
    setInTakeTime("");
    setInTakeTimeOther("");
    setDescription("");
  };
  const handleAddFromGroup = (pharmId) => {
    const dataBillForm = {};
    axios
      .get(`${serverAddress}/pharmaceutical/getone/${pharmId}`)
      .then((response) => {
        dataBillForm.dose = response.data.dose;
        dataBillForm.x = response.data.dose;
        dataBillForm.billId = response.data._id;
        dataBillForm.tradeName = response.data.tradeName;
        dataBillForm.billName = response.data.inputValue;
        dataBillForm.doseNum = response.data.doseCount;
        dataBillForm.inTakeTime = response.data.inTakeTime;
        dataBillForm.inTakeTimeOther = response.data.inTakeTimeOther;
        dataBillForm.description = response.data.description;
        dataBillForm.PrescriptionId = props.PrescriptionId;
        props.onBillGroupAdded(dataBillForm);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    matchFrom: "start",
    limit: 20,
  });

  useEffect(() => {
    if (
      props.editPrescriptionData &&
      props.editPrescriptionData.MedicalDiagnosis
    ) {
      console.log(props.editPrescriptionData);
      setDiagnosis(props.editPrescriptionData.MedicalDiagnosis);
    }
  }, []);

  useEffect(() => {
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
  const handleInputChange = (name, value) => {
    setDiagnosis(value);
  };

  return (
    <form
      className={`fixed flex ${
        props.screenMode
          ? "h-[100%] w-full "
          : props.settingData.billSelectFromGroup
          ? "w-[90%]"
          : "w-3/5"
      } } justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  items-center  p-5 rounded-xl z-50`}
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      {props.settingData ? (
        props.settingData.billSelectFromGroup ? (
          <div className="  w-1/2 h-[80vh] flex flex-col item-center bg-white p-5 overflow-y-scroll">
            <div className="gap-4 flex flex-col justify-center">
              {props.groupList.map((group) => (
                <>
                  <div
                    onClick={() => {
                      setPharmGroupSelected(
                        pharmGroupSelected !== group.name ? `${group.name}` : ""
                      );
                    }}
                    className="w-full flex justify-center items-center bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    {group.name}
                  </div>
                  <div className="flex flex-col gap-4">
                    {pharmGroupSelected == group.name ? (
                      <div className="flex gap-4  flex-col justify-center items-center">
                        {group.pharmaceutical.map((pharm) => (
                          <div
                            onClick={() => {
                              if (
                                !props.pharmaceListInside.find(
                                  (obj) => obj.id._id === pharm._id
                                )
                              ) {
                                handleAddFromGroup(pharm._id);
                              }
                            }}
                            className={
                              props.pharmaceListInside.find(
                                (obj) => obj.id._id === pharm._id
                              )
                                ? "text-red-400 hover:opacity-80 cursor-pointer w-full h-12 hover:bg-gray-100 flex justify-center items-center "
                                : "text-green-400 hover:opacity-80 cursor-pointer w-full h-12 hover:bg-gray-100 flex justify-center items-center"
                            }
                          >
                            {pharm.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      <div
        className={`${
          props.settingData.billSelectFromGroup ? `w-2/3` : `w-full`
        }  h-full bg-white p-4 `}
        style={{ direction: locale === "en" ? "ltr" : "rtl" }}
      >
        {props.screenMode ? (
          <div className=" flex justify-start items-start text-right w-full ">
            <IconButton
              onClick={() => {
                props.handleExit();
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
            <Autocomplete
              size="small"
              disableListWrap
              disablePortal
              id="combo-box-demo"
              options={props.groupList}
              filterOptions={filterOptions}
              getOptionLabel={(option) => {
                return `${option.name}`;
              }}
              sx={{ width: "33%" }}
              onChange={(event, newValue) => {
                handeAddGroupBill(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {}}
              renderInput={(params) => (
                <TextField {...params} label={"اضافة كروب ادوية"} />
              )}
            />{" "}
            <FormattedMessage
              id={"Medical Diagnosis"}
              defaultMessage="Hello, World!"
            /> : 
            {props.userEditData ? props.userEditData.name : ""}
          </h5>
        </div>
        <TextField
          onChange={(event) => {
            setDiagnosis(event.target.value);
          }}
          value={diagnosis}
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
        {!loading ? (
          <MedicalFormChipAutoComplete
            AutoCompletevalue={autoCompleteList.rxMedicalDiagnosis}
            formDataValue={diagnosis}
            handleInputChange={handleInputChange}
            target={"diagnosis"}
          ></MedicalFormChipAutoComplete>
        ) : (
          ""
        )}

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
              renderInput={(props) => <TextField {...props} />}
              format="DD/MM/YYYY HH:mm"
              onChange={(newValue) => {
                setNextVisit(newValue.$d);
                props.setNextVisit(newValue.$d);
                console.log(newValue.$d)
              }}
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
                      }}
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
      </div>
    </form>
  );
}

export default EditPartients;
