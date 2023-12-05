import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  // ... (your other imports)
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { DatePicker, DateTimePicker, TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AfterSurgeryImage from "./AfterSurgeryImage";
import BeforeSurgeryImage from "./BeforeSurgeryImage";

function NewSurgenPatient(props) {
  const [selector, setSelector] = useState("patientPage");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    patient: { id: "", name: "", age: "", gender: "" },
    patientGender: "",
    surgeryType: { id: "", name: "", description: "" },
    sutrgeryNarcosis: {
      id: "",
      name: "",
      description: "",
      startTime: dayjs(),
      endTime: dayjs(),
    },
    productDevice: {
      id: "",
      name: "",
      description: "",
      manufacureName: "",
      serialNumber: "",
    },
    SurgicalProceduresType: { startTime: dayjs(), endTime: dayjs() },
    SurgeryDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs(),
    HospitalName: "",
    SurgeryName: "",
    SurgeryResult: "",
    SurgeryCost: "",
    comment: "",
    SurgeryAssistantName: "",
    priority: "",
    diagnosis: "",
    procedure: "",
    dangerLevel: "",
  });

  useEffect(() => {
    if (props.type === "edit") {
      let patientData = { id: "", name: "", age: "", gender: "" };
      let surgeryType = { id: "", name: "", description: "" };
      let sutrgeryNarcosis = {
        id: "",
        name: "",
        description: "",
        startTime: dayjs(),
        endTime: dayjs(),
      };
      let productDevice = {
        id: "",
        name: "",
        description: "",
        manufacureName: "",
        serialNumber: "",
      };
      let SurgicalProceduresType = { startTime: dayjs(), endTime: dayjs() };

      if (props.data.Patients) {
        patientData = {
          id: props.data.Patients._id,
          name: props.data.Patients.name,
          age: props.data.Patients.age,
          gender: props.data.Patients.gender,
        };
      }
      if (props.data.SurgicalProceduresType) {
        surgeryType = {
          id: props.data.SurgicalProceduresType._id,
          name: props.data.SurgicalProceduresType.name,
        };
      }
      if (props.data.SurgicalProceduresDevice) {
        productDevice = {
          id: props.data.SurgicalProceduresDevice._id,
          name: props.data.SurgicalProceduresDevice.name,
          description: props.data.SurgicalProceduresDevice.description,
          manufacureName: props.data.SurgicalProceduresDevice.manufacureName,
          serialNumber: props.data.SurgicalProceduresDevice.serialNumber,
        };
      }
      if (props.data.SurgicalProceduresNarcosis) {
        sutrgeryNarcosis = {
          id: props.data.SurgicalProceduresNarcosis._id,
          name: props.data.SurgicalProceduresNarcosis.name,
          description: props.data.SurgicalProceduresNarcosis.description,
          startTime: dayjs(props.data.NarcosisStartTime),
          endTime: dayjs(props.data.NarcosisEndTime),
        };
      }

      console.log(props.data);
      setFormData({
        ...formData,
        name: "",
        description: "",
        patient: patientData,
        surgeryType: surgeryType,
        sutrgeryNarcosis: sutrgeryNarcosis,
        productDevice: productDevice,
        SurgicalProceduresType: { startTime: dayjs(), endTime: dayjs() },
        SurgeryDate: dayjs(props.data.SurgeryDate),
        startTime: dayjs(props.data.SurgeryStartTime),
        endTime: dayjs(props.data.SurgeryEndTime),
        HospitalName: props.data.HospitalName,
        SurgeryName: props.data.SurgeryName,
        SurgeryResult: props.data.SurgeryResult,
        SurgeryCost: props.data.SurgeryCost,
        comment: props.data.comment,
        SurgeryAssistantName: props.data.SurgeryAssistantName,
        priority: props.data.priority,
        diagnosis: "",
        procedure: "",
        dangerLevel: props.data.dangerLevel,
      });
    }
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFormSubmit function passed as a prop with the formData
    props.onFormSubmit(formData);
  };

  // Handle changes in form fields
  const handleInputChange = async (name, value) => {
    // Update the formData state with the input data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed flex overflow-scroll flex-col h-3/4  left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-5/6 bg-white  rounded-xl z-50"
    >
      <div className="flex w-full justify-center text-center">
        <div
          onClick={() => {
            setSelector("patientPage");
          }}
          className={`${
            selector === "patientPage"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          معلومات المريض{" "}
        </div>
        <div
          onClick={() => {
            setSelector("surgeryPage");
          }}
          className={`${
            selector === "surgeryPage"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          معلومات العملية{" "}
        </div>
        <div
          onClick={() => {
            setSelector("narcosisPage");
          }}
          className={`${
            selector === "narcosisPage"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48  cursor-pointer`}
        >
          معلومات التخدير{" "}
        </div>
        <div
          onClick={() => {
            setSelector("devicePage");
          }}
          className={`${
            selector === "devicePage"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          معلومات الاجهزة{" "}
        </div>
        <div
          onClick={() => {
            setSelector("imageBeforeSurgery");
          }}
          className={`${
            selector === "imageBeforeSurgery"
              ? "bg-green-400 "
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          صور قبل العملية{" "}
        </div>

        <div
          onClick={() => {
            setSelector("imageAfterSurgery");
          }}
          className={`${
            selector === "imageAfterSurgery"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          صور بعد العملية{" "}
        </div>
        <div
          onClick={() => {
            setSelector("result");
          }}
          className={`${
            selector === "result"
              ? "bg-green-400"
              : "bg-slate-100 hover:bg-green-200"
          }  p-2 w-48   cursor-pointer`}
        >
          النتائج{" "}
        </div>
      </div>
      <div className="w-full">
        <div
          className={`w-full  h-full ${
            selector === "patientPage" ? "" : "hidden"
          }  p-2 px-4 flex flex-col gap-6`}
        >
          <h2>تفاصيل المريض</h2>
          <Autocomplete
            freeSolo
            size="small"
            disableListWrap
            value={formData.patient}
            disablePortal
            id="combo-box-demo"
            options={props.patientList}
            getOptionLabel={(option) => option.name} // Specify the field to use as the label
            onChange={(event, newValue) => {
              if (newValue && newValue._id) {
                // Check if newValue is not null or undefined
                setFormData((prev) => ({
                  ...prev,
                  patient: {
                    ...prev.patient,
                    id: newValue._id,
                    name: newValue.name,
                    age: newValue.age,
                    gender: newValue.gender,
                  },
                }));
              }
              console.log(formData);
            }}
            onInputChange={(event, newInputValue) => {
              setFormData((prev) => ({
                ...prev,
                patient: {
                  ...prev.patient,
                  id: "",
                  name: newInputValue,
                },
              }));
              console.log(formData);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <FormattedMessage
                    id={"PatientName"}
                    defaultMessage="Hello, World!"
                  />
                }
              />
            )}
          />
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.patient.age}
            onChange={(event) => {
              setFormData({
                ...formData,
                patient: {
                  ...formData.patient,
                  age: event.target.value,
                },
              });
            }} // Update the name state
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="العمر"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <FormControl className="bg-whiteh" size="small">
            <InputLabel id="demo-simple-select-helper-label">
              <FormattedMessage id={"Gender"} defaultMessage="Hello, World!" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formData.patient.gender}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  patient: {
                    ...formData.patient,
                    gender: event.target.value,
                  },
                });
              }} // Update the name state
              label={
                <FormattedMessage
                  id={"Gender"}
                  defaultMessage="Hello, World!"
                />
              }
            >
              <MenuItem value={"ذكر"}>
                <FormattedMessage id={"male"} defaultMessage="Hello, World!" />
              </MenuItem>
              <MenuItem value={"انثى"}>
                <FormattedMessage
                  id={"female"}
                  defaultMessage="Hello, World!"
                />
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.comment}
            onChange={(event) =>
              handleInputChange("comment", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="ملاحضات"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
        </div>
        <div
          className={`w-full h-full  ${
            selector === "surgeryPage" ? "" : "hidden"
          } p-2 px-4 flex flex-col gap-4`}
        >
          <h2>تفاصيل العملية</h2>
          <Autocomplete
            freeSolo
            size="small"
            disableListWrap
            disablePortal
            id="combo-box-demo"
            value={formData.surgeryType}
            options={props.surgicalProceduresTypeList}
            onChange={(event, newValue) => {
              if (newValue && newValue._id) {
                // Check if newValue is not null or undefined
                setFormData((prev) => ({
                  ...prev,
                  surgeryType: {
                    ...prev.surgeryType,
                    id: newValue._id,
                    name: newValue.name,
                  },
                }));
              }
              console.log(formData);
            }}
            onInputChange={(event, newInputValue) => {
              setFormData((prev) => ({
                ...prev,
                surgeryType: {
                  ...prev.surgeryType,
                  id: "",
                  name: newInputValue,
                },
              }));
              console.log(formData);
            }}
            getOptionLabel={(option) => option.name} // Specify the field to use as the label
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="اسم العملية" />
            )}
          />
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.dangerLevel}
            onChange={(event) =>
              handleInputChange("dangerLevel", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="مستوى الخطورة"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />

          <LocalizationProvider className="w-full" dateAdapter={AdapterDayjs}>
            <div className="flex w-full gap-4">
              <DatePicker
                className="w-full"
                label="تاريخ العملية"
                renderInput={(props) => <TextField {...props} />}

                format="DD/MM/YYYY"

                value={formData.SurgeryDate}
                onChange={(SurgeryDate) =>
                  handleInputChange("SurgeryDate", SurgeryDate)
                }
              />

              <TimeField
                label="وقت بدء العملية"
                value={formData.startTime}
                onChange={(SurgeryDate) =>
                  handleInputChange("startTime", SurgeryDate)
                }
              />
              <TimeField
                label="وقت انتهاء العملية"
                value={formData.endTime}
                onChange={(SurgeryDate) =>
                  handleInputChange("endTime", SurgeryDate)
                }
              />
            </div>
          </LocalizationProvider>

          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.priority}
            onChange={(event) =>
              handleInputChange("priority", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="الاولوية"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />

          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.HospitalName}
            onChange={(event) =>
              handleInputChange("HospitalName", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="اسم المستشفى"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <div className="w-full flex gap-4">
            <TextField
              dir="rtl"
              id="outlined-required"
              size="small"
              value={formData.SurgeryName}
              onChange={(event) =>
                handleInputChange("SurgeryName", event.target.value)
              }
              sx={{
                width: "100%",
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              label="اسم الجراح"
              InputProps={{
                style: { textAlign: "right" },
              }}
            />
            <TextField
              dir="rtl"
              id="outlined-required"
              size="small"
              value={formData.SurgeryAssistantName}
              onChange={(event) =>
                handleInputChange("SurgeryAssistantName", event.target.value)
              }
              sx={{
                width: "100%",
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              label="اسماء الاطباء المشاركين في العملية"
              InputProps={{
                style: { textAlign: "right" },
              }}
            />
          </div>
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.SurgeryCost}
            onChange={(event) =>
              handleInputChange("SurgeryCost", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="التكلفة"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
        </div>
        <div
          className={`w-full ${
            selector === "narcosisPage" ? "" : "hidden"
          } p-2 px-4 flex flex-col gap-4`}
        >
          <h2>تفاصيل التخدير</h2>
          <Autocomplete
            freeSolo
            size="small"
            disableListWrap
            disablePortal
            id="combo-box-demo"
            options={props.surgicalProceduresNarcosisList}
            value={formData.sutrgeryNarcosis}
            getOptionLabel={(option) => option.name} // Specify the field to use as the label
            onChange={(event, newValue) => {
              if (newValue && newValue._id) {
                // Check if newValue is not null or undefined
                setFormData((prev) => ({
                  ...prev,
                  sutrgeryNarcosis: {
                    ...prev.sutrgeryNarcosis,
                    id: newValue._id,
                    name: newValue.name,
                  },
                }));
              }
              console.log(formData);
            }}
            onInputChange={(event, newInputValue) => {
              setFormData((prev) => ({
                ...prev,
                sutrgeryNarcosis: {
                  ...prev.sutrgeryNarcosis,
                  id: "",
                  name: newInputValue,
                },
              }));
              console.log(formData);
            }}
            renderInput={(params) => (
              <TextField {...params} label={"اسم المخدر"} />
            )}
          />
          <LocalizationProvider className="w-full" dateAdapter={AdapterDayjs}>
            <TextField
              dir="rtl"
              id="outlined-required"
              size="small"
              value={formData.sutrgeryNarcosis.description}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  sutrgeryNarcosis: {
                    ...formData.sutrgeryNarcosis,
                    description: event.target.value,
                  },
                });
              }}
              sx={{
                width: "100%",
                direction: "rtl",
                textAlign: "right",
                color: "#fff",
              }}
              label="ملاحضات"
              InputProps={{
                style: { textAlign: "right" },
              }}
            />
            <div className="flex w-full gap-4">
              <TimeField
                className=" w-full "
                label="وقت بدء التخدير"
                value={formData.sutrgeryNarcosis.startTime}
                onChange={(SurgeryDate) => {
                  setFormData({
                    ...formData,
                    sutrgeryNarcosis: {
                      ...formData.sutrgeryNarcosis,
                      startTime: SurgeryDate,
                    },
                  });
                }}
              />
              <TimeField
                className=" w-full "
                label="وقت انتهاء التخدير"

                value={formData.sutrgeryNarcosis.endTime}

                onChange={(SurgeryDate) => {
                  setFormData({
                    ...formData,
                    sutrgeryNarcosis: {
                      ...formData.sutrgeryNarcosis,
                      endTime: SurgeryDate,
                    },
                  });
                }}
              />
            </div>
          </LocalizationProvider>
        </div>
        <div
          className={`w-full ${
            selector === "devicePage" ? "" : "hidden"
          }  p-2 px-4 flex flex-col gap-4`}
        >
          <h2>تفاصيل جهاز العملية</h2>
          <Autocomplete
            freeSolo
            size="small"
            disableListWrap
            disablePortal
            id="combo-box-demo"
            value={formData.productDevice}
            options={props.surgicalProceduresDeviceList}
            getOptionLabel={(option) => option.name} // Specify the field to use as the label
            onChange={(event, newValue) => {
              if (newValue && newValue._id) {
                // Check if newValue is not null or undefined
                setFormData((prev) => ({
                  ...prev,
                  productDevice: {
                    ...prev.productDevice,
                    id: newValue._id,
                    name: newValue.name,
                    manufacureName: newValue.manufacureName,
                    serialNumber: newValue.serialNumber,
                    description: newValue.description,
                  },
                }));
              }
              console.log(formData);
            }}
            onInputChange={(event, newInputValue) => {
              setFormData((prev) => ({
                ...prev,
                productDevice: {
                  ...prev.productDevice,
                  id: "",
                  name: newInputValue,
                },
              }));
              console.log(formData);
            }}
            renderInput={(params) => (
              <TextField {...params} label={"اسم المخدر"} />
            )}
          />
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.productDevice.manufacureName}
            onChange={(event) => {
              setFormData({
                ...formData,
                productDevice: {
                  ...formData.productDevice,
                  manufacureName: event.target.value,
                },
              });
            }} // Update the name state
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="الشركة المصنعة"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.productDevice.serialNumber}
            onChange={(event) => {
              setFormData({
                ...formData,
                productDevice: {
                  ...formData.productDevice,
                  serialNumber: event.target.value,
                },
              });
            }} // Update the name state
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="السيريل نمبر"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.productDevice.description}
            onChange={(event) => {
              setFormData({
                ...formData,
                productDevice: {
                  ...formData.productDevice,
                  description: event.target.value,
                },
              });
            }} // Update the name state
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="الوصف"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
        </div>

        <div
          className={`w-full ${
            selector === "imageBeforeSurgery" ? "" : "hidden"
          } p-2 px-4 flex flex-col gap-4`}
        >
          <h2>صور قبل العملية</h2>
          {props.currentNewSurgery ? (
            <BeforeSurgeryImage
              id={props.currentNewSurgery._id}
              images={props.currentNewSurgery.beforeSurgeryImage}
              refreshCurrentSurgery={props.refreshCurrentSurgery}
            ></BeforeSurgeryImage>
          ) : (
            ""
          )}
        </div>
        <div
          className={`w-full ${
            selector === "imageAfterSurgery" ? "" : "hidden"
          } p-2 px-4 flex flex-col gap-4`}
        >
          <h2>صور بعد العملية</h2>
          {props.currentNewSurgery && props.currentNewSurgery._id ? (
            <AfterSurgeryImage
              id={props.currentNewSurgery._id}
              images={props.currentNewSurgery.afterSurgeryImage}
              refreshPaitent={props.refreshCurrentSurgery}
            ></AfterSurgeryImage>
          ) : (
            ""
          )}
        </div>
        <div
          className={`w-full ${
            selector === "result" ? "" : "hidden"
          } p-2 px-4 flex flex-col gap-4`}
        >
          <h2>النتيجة</h2>
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            multiline
            rows={4}
            value={formData.SurgeryResult}
            onChange={(event) =>
              handleInputChange("SurgeryResult", event.target.value)
            }
            sx={{
              width: "100%",
              direction: "rtl",
              textAlign: "right",
              color: "#fff",
            }}
            label="النتيجة"
            InputProps={{
              style: { textAlign: "right" },
            }}
          />
        </div>
      </div>
      <div className="w-full h-full relative">
        <div className=" w-full absolute bottom-0">
          <Button
            type="submit"
            variant="contained"
            className="w-full"
            color="success"
          >
            {props.type === "edit" ? (
              <FormattedMessage id={"edit"} defaultMessage="Hello, World!" />
            ) : (
              <FormattedMessage id={"new"} defaultMessage="Hello, World!" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewSurgenPatient;
