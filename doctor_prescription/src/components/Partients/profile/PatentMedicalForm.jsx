import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function PatentMedicalForm(props) {
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
  };

  // Handle changes in form fields
  const handleInputChange = (name, value) => {
    props.handleEditPatientData({ [name]: value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form
      className="flex w-full flex-col overflow-scroll gap-5 items-center bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div className="w-full flex gap-9"></div>
      {props.settingData.medicalDiagnosisActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.currentMedicalHistoryActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.medicalHistoryActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.previousSurgeriesActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.familyHistoryActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.fumblingActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.fracturesActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.ExaminationFindiningActive ? (
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
        />
      ) : (
        ""
      )}
      {props.settingData.pulseRateActive ? (
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
        />
      ) : (
        ""
      )}
      {props.settingData.spo2Active ? (
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
          label={
            <FormattedMessage id={"spo2"} defaultMessage="Hello, World!" />
          }
        />
      ) : (
        ""
      )}
      {props.settingData.temperatureActive ? (
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
            <FormattedMessage
              id={"temperature"}
              defaultMessage="Hello, World!"
            />
          }
        />
      ) : (
        ""
      )}
      {props.settingData.bloodPressureActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.bloodSugarActive ? (
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
            <FormattedMessage
              id={"bloodSugar"}
              defaultMessage="Hello, World!"
            />
          }
        />
      ) : (
        ""
      )}
      {props.settingData.InvestigationFindingActive ? (
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
      ) : (
        ""
      )}
      {props.settingData.miscarriageStateActive && formData.miscarriageState ? (
        <>
          <div>الاسقاطات</div>
          <div className="flex justify-between w-full">
            {props.userEditData
              ? props.userEditData.MiscarriageData
                ? props.userEditData.MiscarriageData.map((child, index) => (
                    <div className="">
                      <div>{`اسقاط رقم ${index + 1}`}</div>
                      <div>{`السبب  : ${child.reason}`}</div>
                      <div>
                        تاريخ الاسقاط :{" "}
                        {new Date(child.date).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                  ))
                : ""
              : ""}
          </div>
        </>
      ) : (
        ""
      )}

      {props.settingData.pregnancyActive && formData.pregnancyState ? (
        <>
          {" "}
          <div>الحمل الحالي</div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex justify-between items-center">
              <div>تاريخ اخر دورة</div>
              <div>
                {new Date(
                  props.userEditData.pregnancyData?.DateOfLastPeriod
                ).toLocaleDateString("en-GB") || ""}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>تسلسل الحمل</div>
              <div>
                {props.userEditData.pregnancyData?.PregnancySequence || ""}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>نوع الولادة السابقة</div>
              <div>
                {props.userEditData.pregnancyData?.TypeOfPreviousBirth || ""}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>صنف دم الزوج</div>
              <div>
                {props.userEditData.pregnancyData?.HusbandsBloodType || ""}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>ملاحضات حول الحمل</div>
              <div>{props.userEditData.pregnancyData?.comment || ""}</div>
            </div>
            {props.userEditData.pregnancyData.DateOfLastPeriod ? (
                <div className="flex justify-between w-full">
                  <div>موعد الحمل</div>
                  <div>
                    {" "}
                    {props.userEditData
                      ? dayjs(props.userEditData.pregnancyData.DateOfLastPeriod)
                          .add(9, "month")
                          .format("YYYY-MM-DD")
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}

          </div>
        </>
      ) : (
        ""
      )}

      <div className="flex gap-6 w-full justify-between">
        <IconButton>
          {/* <PrintRounded color="action"></PrintRounded> */}
        </IconButton>
      </div>
    </form>
  );
}

export default PatentMedicalForm;
