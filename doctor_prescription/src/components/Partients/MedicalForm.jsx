import React, { useEffect, useState } from "react";
import { CloseSharp, Mic, MicOff } from "@mui/icons-material";
import {
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
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import MedicalFormChipAutoComplete from "./MedicalFormChipAutoComplete";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function MedicalForm(props) {
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [textSelector, setTextSelector] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fumbling: "",
    medicalDiagnosis: "",
    currentMedicalHistory: "",
    medicalHistory: "",
    previousSurgeries: "",
    familyHistory: "",
    fractures: "",
    pulseRate: "",
    spo2: "",
    temperature: "",
    bloodPressure: "",
    bloodSugar: "",
    ExaminationFindining: "",
    InvestigationFinding: "",
    DateOfLastPeriod: "",
  });
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });
  const [oldText, setOldText] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error("Browser doesn't support speech recognition.");
      return;
    }
    console.log("lisint", listening);
    if (listening) {
      console.log(transcript);
      console.log("oldText", oldText);
      const text = oldText ? oldText : "";
      console.log("oldText", text);

      handleInputChange(textSelector, `${text} ${transcript}`);
    }
  }, [transcript, listening]);

  const startListening = (name) => {
    resetTranscript();
    setTextSelector(name);
    setOldText(formData[name]);
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

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

  useEffect(() => {
    const { diseases, ...formDataWithoutDiseases } = props.userEditData;
    setFormData(formDataWithoutDiseases);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(formData);
  };

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

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
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
      className={`fixed flex flex-col overflow-scroll h-[90%] left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center ${
        props.screenMode ? "h-[100%] w-full p-4" : "h-[90%]  "
      } } w-3/5 bg-white p-5 rounded-xl z-50`}
      onSubmit={handleSubmit}
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      {props.screenMode ? (
        <div className=" flex justify-start items-start text-right w-full ">
          <IconButton onClick={props.handleExit}>
            <CloseSharp className=" text-red-700  top-5 right-5" />
          </IconButton>
        </div>
      ) : (
        ""
      )}

      {!loading ? (
        <>
          <div className="w-full flex gap-9"></div>
          <div className=" text-right w-full">
            <h5>
              <FormattedMessage
                id={"Examination for"}
                defaultMessage="Hello, World!"
              />
              : <span className=" font-bold">{props.userEditData.name}</span>
            </h5>
          </div>
          {props.settingData.medicalDiagnosisActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.medicalDiagnosis}
                  onChange={(event) =>
                    handleInputChange("medicalDiagnosis", event.target.value)
                  }
                  onClick={() => setTextSelector("medicalDiagnosis")}
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
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("medicalDiagnosis")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "medicalDiagnosis"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "medicalDiagnosis" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "medicalDiagnosis" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.medicalDiagnosis}
                  formDataValue={formData.medicalDiagnosis}
                  handleInputChange={handleInputChange}
                  target={"medicalDiagnosis"}
                />
              )}
            </>
          )}
          {props.settingData.currentMedicalHistoryActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.currentMedicalHistory}
                  onChange={(event) =>
                    handleInputChange(
                      "currentMedicalHistory",
                      event.target.value
                    )
                  }
                  onClick={() => setTextSelector("currentMedicalHistory")}
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
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("currentMedicalHistory")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "currentMedicalHistory"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "currentMedicalHistory" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "currentMedicalHistory" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.currentMedicalHistory}
                  formDataValue={formData.currentMedicalHistory}
                  handleInputChange={handleInputChange}
                  target={"currentMedicalHistory"}
                />
              )}
            </>
          )}
          {props.settingData.medicalHistoryActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.medicalHistory}
                  onChange={(event) =>
                    handleInputChange("medicalHistory", event.target.value)
                  }
                  onClick={() => setTextSelector("medicalHistory")}
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
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("medicalHistory")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "medicalHistory"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "medicalHistory" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "medicalHistory" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.medicalHistory}
                  formDataValue={formData.medicalHistory}
                  handleInputChange={handleInputChange}
                  target={"medicalHistory"}
                />
              )}
            </>
          )}
          {props.settingData.previousSurgeriesActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.previousSurgeries}
                  onChange={(event) =>
                    handleInputChange("previousSurgeries", event.target.value)
                  }
                  onClick={() => setTextSelector("previousSurgeries")}
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
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("previousSurgeries")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "previousSurgeries"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "previousSurgeries" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "previousSurgeries" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.previousSurgeries}
                  formDataValue={formData.previousSurgeries}
                  handleInputChange={handleInputChange}
                  target={"previousSurgeries"}
                />
              )}
            </>
          )}
          {props.settingData.familyHistoryActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.familyHistory}
                  onChange={(event) =>
                    handleInputChange("familyHistory", event.target.value)
                  }
                  onClick={() => setTextSelector("familyHistory")}
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
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("familyHistory")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "familyHistory"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "familyHistory" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "familyHistory" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.familyHistory}
                  formDataValue={formData.familyHistory}
                  handleInputChange={handleInputChange}
                  target={"familyHistory"}
                />
              )}
            </>
          )}
          {props.settingData.fumblingActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.fumbling}
                  onChange={(event) =>
                    handleInputChange("fumbling", event.target.value)
                  }
                  onClick={() => setTextSelector("fumbling")}
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
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("fumbling") : stopListening()
                  }
                  color={
                    listening && textSelector === "fumbling"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "fumbling" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "fumbling" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.fumbling}
                  formDataValue={formData.fumbling}
                  handleInputChange={handleInputChange}
                  target={"fumbling"}
                />
              )}
            </>
          )}
          {props.settingData.InvestigationFindingActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.InvestigationFinding}
                  onChange={(event) =>
                    handleInputChange(
                      "InvestigationFinding",
                      event.target.value
                    )
                  }
                  onClick={() => setTextSelector("InvestigationFinding")}
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
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("InvestigationFinding")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "InvestigationFinding"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "InvestigationFinding" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "InvestigationFinding" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.InvestigationFinding}
                  formDataValue={formData.InvestigationFinding}
                  handleInputChange={handleInputChange}
                  target={"InvestigationFinding"}
                />
              )}
            </>
          )}
          {props.settingData.fracturesActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.fractures}
                  onChange={(event) =>
                    handleInputChange("fractures", event.target.value)
                  }
                  onClick={() => setTextSelector("fractures")}
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
                      id={"fractures"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("fractures") : stopListening()
                  }
                  color={
                    listening && textSelector === "fractures"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "fractures" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "fractures" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.fractures}
                  formDataValue={formData.fractures}
                  handleInputChange={handleInputChange}
                  target={"fractures"}
                />
              )}
            </>
          )}
          {props.settingData.ExaminationFindiningActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.ExaminationFindining}
                  onChange={(event) =>
                    handleInputChange(
                      "ExaminationFindining",
                      event.target.value
                    )
                  }
                  onClick={() => setTextSelector("ExaminationFindining")}
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
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("ExaminationFindining")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "ExaminationFindining"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "ExaminationFindining" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "ExaminationFindining" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.ExaminationFindining}
                  formDataValue={formData.ExaminationFindining}
                  handleInputChange={handleInputChange}
                  target={"ExaminationFindining"}
                />
              )}
            </>
          )}
          {props.settingData.pulseRateActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.pulseRate}
                  onChange={(event) =>
                    handleInputChange("pulseRate", event.target.value)
                  }
                  onClick={() => setTextSelector("pulseRate")}
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
                      id={"pulseRate"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("pulseRate") : stopListening()
                  }
                  color={
                    listening && textSelector === "pulseRate"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "pulseRate" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "pulseRate" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.pulseRate}
                  formDataValue={formData.pulseRate}
                  handleInputChange={handleInputChange}
                  target={"pulseRate"}
                />
              )}
            </>
          )}
          {props.settingData.spo2Active && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.spo2}
                  onChange={(event) =>
                    handleInputChange("spo2", event.target.value)
                  }
                  onClick={() => setTextSelector("spo2")}
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
                      id={"spo2"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("spo2") : stopListening()
                  }
                  color={
                    listening && textSelector === "spo2" ? "primary" : "default"
                  }
                >
                  {listening && textSelector === "spo2" ? <MicOff /> : <Mic />}
                </IconButton>
              </div>
              {textSelector === "spo2" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.spo2}
                  formDataValue={formData.spo2}
                  handleInputChange={handleInputChange}
                  target={"spo2"}
                />
              )}
            </>
          )}
          {props.settingData.temperatureActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.temperature}
                  onChange={(event) =>
                    handleInputChange("temperature", event.target.value)
                  }
                  onClick={() => setTextSelector("temperature")}
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
                      id={"temperature"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("temperature") : stopListening()
                  }
                  color={
                    listening && textSelector === "temperature"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "temperature" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "temperature" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.temperature}
                  formDataValue={formData.temperature}
                  handleInputChange={handleInputChange}
                  target={"temperature"}
                />
              )}
            </>
          )}
          {props.settingData.bloodPressureActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.bloodPressure}
                  onChange={(event) =>
                    handleInputChange("bloodPressure", event.target.value)
                  }
                  onClick={() => setTextSelector("bloodPressure")}
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
                />
                <IconButton
                  onClick={() =>
                    !listening
                      ? startListening("bloodPressure")
                      : stopListening()
                  }
                  color={
                    listening && textSelector === "bloodPressure"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "bloodPressure" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "bloodPressure" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.bloodPressure}
                  formDataValue={formData.bloodPressure}
                  handleInputChange={handleInputChange}
                  target={"bloodPressure"}
                />
              )}
            </>
          )}
          {props.settingData.bloodSugarActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={formData.bloodSugar}
                  onChange={(event) =>
                    handleInputChange("bloodSugar", event.target.value)
                  }
                  onClick={() => setTextSelector("bloodSugar")}
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
                      id={"bloodSugar"}
                      defaultMessage="Hello, World!"
                    />
                  }
                />
                <IconButton
                  onClick={() =>
                    !listening ? startListening("bloodSugar") : stopListening()
                  }
                  color={
                    listening && textSelector === "bloodSugar"
                      ? "primary"
                      : "default"
                  }
                >
                  {listening && textSelector === "bloodSugar" ? (
                    <MicOff />
                  ) : (
                    <Mic />
                  )}
                </IconButton>
              </div>
              {textSelector === "bloodSugar" && (
                <MedicalFormChipAutoComplete
                  AutoCompletevalue={autoCompleteList.bloodSugar}
                  formDataValue={formData.bloodSugar}
                  handleInputChange={handleInputChange}
                  target={"bloodSugar"}
                />
              )}
            </>
          )}

          {props.settingData.DateOfLastPeriodActive && (
            <>
              <div className="flex w-full items-center">
                <TextField
                  value={
                    formData.DateOfLastPeriod
                      ? dayjs(formData.DateOfLastPeriod)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                  type="date"
                  onChange={(event) =>
                    handleInputChange("DateOfLastPeriod", event.target.value)
                  }
                  onClick={() => setTextSelector("DateOfLastPeriod")}
                  id="outlined-multiline-static"
                  size="small"
                  sx={{
                    width: "100%",
                    color: "#fff",
                  }}
                  label={
                    <FormattedMessage
                      id={"DateOfLastPeriod"}
                      defaultMessage="تاريخ اخر دورة"
                    />
                  }
                />
              </div>
            </>
          )}

          {props.settingData.miscarriageStateActive && (
            <>
              <p> اسقاط حمل</p>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={formData.miscarriageState}
                    onChange={(event) =>
                      handleInputChange(
                        "miscarriageState",
                        !formData.miscarriageState
                      )
                    }
                    color="primary"
                  />
                }
              />
              {formData.miscarriageState && (
                <>
                  <TextField
                    value={formData.MiscarriageNo}
                    onChange={(event) =>
                      handleInputChange("MiscarriageNo", event.target.value)
                    }
                    id="outlined-multiline-static"
                    size="small"
                    sx={{
                      width: "100%",
                      color: "#fff",
                    }}
                    type="number"
                    multiline
                    label={"عدد الاسقاطات"}
                  />
                  <div className="flex gap-4 flex-wrap">
                    {renderChildFields()}
                  </div>
                </>
              )}
            </>
          )}

          {props.settingData.pregnancyActive && (
            <>
              <p>حمل حالي</p>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={formData.pregnancyState}
                    onChange={(event) =>
                      handleInputChange(
                        "pregnancyState",
                        !formData.pregnancyState
                      )
                    }
                    color="primary"
                  />
                }
              />
              {formData.pregnancyState && (
                <>
                  <div className="flex w-full gap-4">
                    <div style={{ direction: "ltr" }}>
                      <TextField
                        size="small"
                        value={
                          formatDate(
                            formData.pregnancyData?.DateOfLastPeriod
                          ) || ""
                        }
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            pregnancyData: {
                              ...formData.pregnancyData,
                              DateOfLastPeriod: event.target.value,
                            },
                          })
                        }
                        sx={{
                          width: "100%",
                          textAlign: "right",
                          color: "#fff",
                        }}
                        type="date"
                        InputProps={{
                          style: { textAlign: "right" },
                        }}
                        label="تاريخ اخر دورة"
                      />
                    </div>
                    <TextField
                      value={formData.pregnancyData?.PregnancySequence || ""}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          pregnancyData: {
                            ...formData.pregnancyData,
                            PregnancySequence: event.target.value,
                          },
                        })
                      }
                      id="outlined-multiline-static"
                      type="Number"
                      size="small"
                      sx={{
                        width: "100%",
                        color: "#fff",
                      }}
                      label="تسلسل الحمل"
                    />
                  </div>
                  <div className="flex w-full gap-4">
                    <FormControl className=" w-full bg-whiteh" size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        نوع الولادة السابقة{" "}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={
                          formData.pregnancyData?.TypeOfPreviousBirth || ""
                        }
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            pregnancyData: {
                              ...formData.pregnancyData,
                              TypeOfPreviousBirth: event.target.value,
                            },
                          })
                        }
                        label="نوع الولادة السابقة"
                      >
                        <MenuItem value={"طبيعية"}>طبيعية</MenuItem>
                        <MenuItem value={"قيصرية"}>قيصرية</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className=" w-full bg-whiteh" size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        فصيلة دم الزوج{" "}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formData.pregnancyData?.HusbandsBloodType || ""}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            pregnancyData: {
                              ...formData.pregnancyData,
                              HusbandsBloodType: event.target.value,
                            },
                          })
                        }
                        label="فصيلة دم الزوج"
                      >
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"B-"}>B-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <TextField
                    value={formData.pregnancyData?.comment || ""}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        pregnancyData: {
                          ...formData.pregnancyData,
                          comment: event.target.value,
                        },
                      })
                    }
                    id="outlined-multiline-static"
                    size="small"
                    sx={{
                      width: "100%",
                      color: "#fff",
                    }}
                    label="ملاحظات حول الحمل"
                  />
                  {formData.pregnancyData &&
                    formData.pregnancyData.DateOfLastPeriod && (
                      <div className="flex justify-between w-full">
                        <div>موعد الانجاب</div>
                        <div>
                          {formData.pregnancyData
                            ? dayjs(formData.pregnancyData.DateOfLastPeriod)
                                .add(9, "month")
                                .format("YYYY-MM-DD")
                            : ""}
                        </div>
                      </div>
                    )}
                </>
              )}
            </>
          )}
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
