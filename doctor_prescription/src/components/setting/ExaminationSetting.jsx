import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";

function ExaminationSetting(props) {
  const [property, setProperty] = useState({
    medicalDiagnosisActive: "",
    currentMedicalHistoryActive: "",
    medicalHistoryActive: "",
    previousSurgeriesActive: "",
    familyHistoryActive: "",
    fumblingActive: "",
    InvestigationFindingActive: "",
    fracturesActive: "",
    ExaminationFindiningActive: "",
    pulseRateActive: "",
    spo2Active: "",
    temperatureActive: "",
    bloodPressureActive: "",
    bloodSugarActive: "",
    DateOfLastPeriodActive:"",
    miscarriageStateActive: "",
  });
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    const getSettingApi = () => {
      axios
        .get(`${serverAddress}/setting/getdata`)
        .then((response) => {
          setProperty(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getSettingApi();
  }, []);

  const handleInputChange = (name, value) => {
    const data = { [name]: value };
    console.log(data);
    axios
      .post(`${serverAddress}/setting/update`, {
        data: data,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    setProperty({
      ...property,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="flex gap-4">
        <div className=" border p-3 shadow rounded">
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Medical Diagnosis"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.medicalDiagnosisActive}
                  onChange={(event) => {
                    handleInputChange(
                      "medicalDiagnosisActive",
                      !property.medicalDiagnosisActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Present Medical History"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.currentMedicalHistoryActive}
                  onChange={(event) => {
                    handleInputChange(
                      "currentMedicalHistoryActive",
                      !property.currentMedicalHistoryActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Medical History"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.medicalHistoryActive}
                  onChange={(event) => {
                    handleInputChange(
                      "medicalHistoryActive",
                      !property.medicalHistoryActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Previous Surgical Procedures"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.previousSurgeriesActive}
                  onChange={(event) => {
                    handleInputChange(
                      "previousSurgeriesActive",
                      !property.previousSurgeriesActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
        </div>
        <div className=" border p-3 shadow rounded">
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Family Medical History"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.familyHistoryActive}
                  onChange={(event) => {
                    handleInputChange(
                      "familyHistoryActive",
                      !property.familyHistoryActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"Medication Allergies"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.fumblingActive}
                  onChange={(event) => {
                    handleInputChange(
                      "fumblingActive",
                      !property.fumblingActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"InvestigationFinding"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.InvestigationFindingActive}
                  onChange={(event) => {
                    handleInputChange(
                      "InvestigationFindingActive",
                      !property.InvestigationFindingActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"fractures"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.fracturesActive}
                  onChange={(event) => {
                    handleInputChange(
                      "fracturesActive",
                      !property.fracturesActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
        </div>
        <div className=" border p-3 shadow rounded">
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"ExaminationFindining"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.ExaminationFindiningActive}
                  onChange={(event) => {
                    handleInputChange(
                      "ExaminationFindiningActive",
                      !property.ExaminationFindiningActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"pulseRate"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.pulseRateActive}
                  onChange={(event) => {
                    handleInputChange(
                      "pulseRateActive",
                      !property.pulseRateActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage id={"spo2"} defaultMessage="Hello, World!" />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.spo2Active}
                  onChange={(event) => {
                    handleInputChange("spo2Active", !property.spo2Active);
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"temperature"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.temperatureActive}
                  onChange={(event) => {
                    handleInputChange(
                      "temperatureActive",
                      !property.temperatureActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
        </div>
        <div className=" border p-3 shadow rounded">
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"bloodPressure"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.bloodPressureActive}
                  onChange={(event) => {
                    handleInputChange(
                      "bloodPressureActive",
                      !property.bloodPressureActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"bloodSugar"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.bloodSugarActive}
                  onChange={(event) => {
                    handleInputChange(
                      "bloodSugarActive",
                      !property.bloodSugarActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"miscarriageState"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.miscarriageStateActive}
                  onChange={(event) => {
                    handleInputChange(
                      "miscarriageStateActive",
                      !property.miscarriageStateActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <div>
              {" "}
              <FormattedMessage
                id={"pregnancyCurrent"}
                defaultMessage="Hello, World!"
              />
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.pregnancyActive}
                  onChange={(event) => {
                    handleInputChange(
                      "pregnancyActive",
                      !property.pregnancyActive
                    );
                  }}
                  color="primary"
                />
              }
            />

          </div>
        </div>

        <div className=" border p-3 shadow rounded">
          <div className="flex w-full justify-between items-center">
            <div>
              {/* <FormattedMessage
                id={"DateOfLastPeriodActive"}
                defaultMessage="Hello, World!"
              /> */}
              اخر موعد للدورة
            </div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={property.DateOfLastPeriodActive}
                  onChange={(event) => {
                    handleInputChange(
                      "DateOfLastPeriodActive",
                      !property.DateOfLastPeriodActive
                    );
                  }}
                  color="primary"
                />
              }
            />
          </div>
        </div>




      </div>
    </div>
  );
}

export default ExaminationSetting;
