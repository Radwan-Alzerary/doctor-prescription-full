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
import dayjs from "dayjs";
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
            id={"Examination for"}
            defaultMessage="Hello, World!"
          />{" "}
          : <span className=" font-bold">{props.userEditData.name}</span>
        </h5>
      </div>
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
          // defaultValue="Hello World"
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
          // defaultValue="Hello World"
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
          // defaultValue="Hello World"
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
          // defaultValue="Hello World"
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
          // defaultValue="Hello World"
        />
      ) : (
        ""
      )}
      {props.settingData.miscarriageStateActive ? (
        <>
          <p> اسقاط حمل</p>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={formData.miscarriageState}
                onChange={(event) => {
                  handleInputChange(
                    "miscarriageState",
                    !formData.miscarriageState
                  );
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
        </>
      ) : (
        ""
      )}
      {props.settingData.pregnancyActive ? (
        <>
          <p>حمل حالي</p>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={formData.pregnancyState}
                onChange={(event) => {
                  handleInputChange("pregnancyState", !formData.pregnancyState);
                }}
                color="primary"
              />
            }
          />
          {formData.pregnancyState ? (
            <>
              <div className="flex w-full gap-4">
                <div style={{ direction: "ltr" }}>
                  <TextField
                    size="small"
                    value={
                      formatDate(formData.pregnancyData?.DateOfLastPeriod) || ""
                    }
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        pregnancyData: {
                          ...formData.pregnancyData,
                          DateOfLastPeriod: event.target.value,
                        },
                      });
                    }}
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
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      pregnancyData: {
                        ...formData.pregnancyData,
                        PregnancySequence: event.target.value,
                      },
                    });
                  }}
                  id="outlined-multiline-static"
                  type="Number"
                  size="small"
                  sx={{
                    width: "100%",
                    color: "#fff",
                  }}
                  // label={
                  //   <FormattedMessage id={"spo2"} defaultMessage="Hello, World!" />
                  // }
                  label="تسلسل الحمل"
                  // defaultValue="Hello World"
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
                    value={formData.pregnancyData?.TypeOfPreviousBirth || ""}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        pregnancyData: {
                          ...formData.pregnancyData,
                          TypeOfPreviousBirth: event.target.value,
                        },
                      });
                    }}
                    label="نوع الولادة السابقة"
                    // label={
                    //   <FormattedMessage
                    //     id={"bloodType"}
                    //     defaultMessage="Hello, World!"
                    //   />
                    // }
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
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        pregnancyData: {
                          ...formData.pregnancyData,
                          HusbandsBloodType: event.target.value,
                        },
                      });
                    }}
                    label="فصيلة دم الزوج"
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>o+</MenuItem>
                    <MenuItem value={"O-"}>o-</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                value={formData.pregnancyData?.comment || ""}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    pregnancyData: {
                      ...formData.pregnancyData,
                      comment: event.target.value,
                    },
                  });
                }}
                id="outlined-multiline-static"
                size="small"
                sx={{
                  width: "100%",
                  color: "#fff",
                }}
                // label={
                //   <FormattedMessage id={"spo2"} defaultMessage="Hello, World!" />
                // }
                label="ملاحضات حول الحمل"
                // defaultValue="Hello World"
              />
              {formData.pregnancyData.DateOfLastPeriod ? (
                <div className="flex justify-between w-full">
                  <div>موعد الحمل</div>
                  <div>
                    {" "}
                    {formData.pregnancyData
                      ? dayjs(formData.pregnancyData.DateOfLastPeriod)
                          .add(9, "month")
                          .format("YYYY-MM-DD")
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
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
