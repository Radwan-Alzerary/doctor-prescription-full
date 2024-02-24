import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { json } from "react-router-dom";

function NewPatientForm(props) {
  const [historyPatient, setHistoryPatient] = useState([]);
  const [userAvailableCheck, setUserAvailableCheck] = useState(false);
  console.log(historyPatient);
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleChange = (event, value) => {
    setFormData({
      ...formData,
      diseases: value, // Assuming you want them as a comma-separated string
    });
  };
  useEffect(() => {
    console.log(historyPatient);
  }, [historyPatient]);

  const [formData, setFormData] = useState({
    name: "",
    phonNumber: "",
    adresses: "",
    gender: "ذكر",
    age: "",
    numberOfChildren: "",
    monthAge: "",
    dayAge: "",
    weight: "",
    childrenData: [], // Array to store data for each child
    length: "",
    description: "",
    jop: "",
    bloodType: "",
    MaritalStatus: "",
    fumbling: "",
    diseases: [],
  });
  useEffect(() => {
    // setHistoryPatient(props.data.diseases);

    if (props.type === "edit") {
      if (props.data.diseases) {
        const diseasesArray = [];

        props.data.diseases.forEach((element) => {
          diseasesArray.push(element.name);
          setHistoryPatient(diseasesArray);
        });
      }
      setFormData({
        ...formData,
        name: props.data.name,
        phonNumber: props.data.phonNumber,
        adresses: props.data.adresses,
        gender: props.data.gender,
        bloodType: props.data.bloodType,
        jop: props.data.jop,
        MaritalStatus: props.data.MaritalStatus,
        age: props.data.age,
        Sequence: props.data.Sequence,
        childrenData: props.data.childrenData, // Array to store data for each child
        monthAge: props.data.monthAge,
        dayAge: props.data.dayAge,
        numberOfChildren: props.data.numberOfChildren,
        weight: props.data.weight,
        length: props.data.length,
        description: props.data.description,
        fumbling: props.data.fumbling,
        diseases: props.data.diseases,
      });
      console.log(props.data);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(formData);
  };
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  const checkAvailableUser = (name) => {
    console.log(name);
    axios
      .get(`${serverAddress}/patients/checkuser/${name}`)
      .then((response) => {
        setUserAvailableCheck(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {}, [userAvailableCheck]);
  // Handle changes in form fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChildrenDataChange = (childIndex, property, value) => {
    const updatedChildrenData = [...formData.childrenData];
    updatedChildrenData[childIndex] = {
      ...updatedChildrenData[childIndex],
      [property]: value,
    };

    setFormData({
      ...formData,
      childrenData: updatedChildrenData,
    });
  };
  const handleDateChange = (newValue) => {
    var birthDate = new Date(newValue);

    // الحصول على تاريخ اليوم الحالي
    var currentDate = new Date();

    // حساب الفارق بين التاريخين بالأمثال
    var ageInMilliseconds = currentDate - birthDate;

    // تحويل الفارق إلى سنوات والباقي يكون في الأيام
    var ageInSeconds = ageInMilliseconds / 1000;
    var ageInMinutes = ageInSeconds / 60;
    var ageInHours = ageInMinutes / 60;
    var ageInDays = ageInHours / 24;
    var ageInYears = Math.floor(ageInDays / 365.25);
    var remainingDays = Math.floor(ageInDays % 365.25);
    var remainingMonths = Math.floor(remainingDays / 30);
    remainingDays = remainingDays % 30;
    console.log(ageInYears);
    console.log(remainingMonths);
    console.log(remainingDays);
    setFormData({
      ...formData,
      age: ageInYears,
      monthAge: remainingMonths,
      dayAge: remainingDays, // Assuming you want them as a comma-separated string
    });
  };

  const renderChildFields = () => {
    const childFields = [];
    const formatDate = (date) => {
      if (!date) return "";
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    };

    for (let i = 0; i < formData.numberOfChildren; i++) {
      childFields.push(
        <div key={i} className="flex flex-col gap-4">
          <FormControl className=" bg-whiteh" size="small">
            <InputLabel id="demo-simple-select-helper-label">
              <FormattedMessage
                id={`childTypeLabel-${i}`}
                defaultMessage={`نوع ولادة الطفل ${i + 1}`}
              />
            </InputLabel>

            <Select
              id={`child-type-${i}`}
              size="small"
              value={formData.childrenData[i]?.type || ""}
              onChange={(event) =>
                handleChildrenDataChange(i, "type", event.target.value)
              }
              label={
                <FormattedMessage
                  id={`childTypeLabel-${i}`}
                  defaultMessage={`نوع ولادة الطفل ${i + 1}`}
                />
              }
            >
              <MenuItem value={"طبيعية"}>طبيعية</MenuItem>
              <MenuItem value={"قيصرية"}>قيصرية</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id={`child-date-${i}`}
            size="small"
            value={formatDate(formData.childrenData[i]?.date) || ""}
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
      className="fixed overflow-scroll h-[90%] flex flex-col  left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-[70%] bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div className=" text-right w-full">
        <h5>
          <FormattedMessage
            id={"personal information"}
            defaultMessage="Hello, World!"
          />
        </h5>
      </div>
      <div className="flex gap-4  w-full">
        <TextField
          required
          id="outlined-required"
          size="small"
          value={formData.name}
          onChange={(event) => {
            handleInputChange("name", event.target.value);
            checkAvailableUser(event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            border: "#000",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"New Patient"}
              defaultMessage="Hello, World!"
            />
          }
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          // required
          id="outlined-required"
          size="small"
          value={formData.phonNumber}
          onChange={(event) =>
            handleInputChange("phonNumber", event.target.value)
          } // Update the name state
          sx={{
            width: "20%",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"phone number"}
              defaultMessage="Hello, World!"
            />
          }
          type="number"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          id="outlined-required"
          size="small"
          value={formData.adresses}
          onChange={(event) =>
            handleInputChange("adresses", event.target.value)
          }
          sx={{
            width: "50%",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Address"} defaultMessage="Hello, World!" />
          }
        />
        <TextField
          id="outlined-required"
          size="small"
          value={formData.jop}
          onChange={(event) => handleInputChange("jop", event.target.value)}
          sx={{
            width: "30%",
            textAlign: "right",
            color: "#fff",
          }}
          label={<FormattedMessage id={"jop"} defaultMessage="Hello, World!" />}
        />

        <TextField
          id="outlined-required"
          size="small"
          value={formData.Sequence}
          onChange={(event) =>
            handleInputChange("Sequence", event.target.value)
          }
          sx={{
            width: "10%",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Sequence"} defaultMessage="Hello, World!" />
          }
        />
      </div>
      <div className=" text-right w-full">
        <h5>
          <FormattedMessage
            id={"additional information"}
            defaultMessage="Hello, World!"
          />
        </h5>
      </div>

      <div className=" flex w-full gap-4 items-center">
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">
            <FormattedMessage id={"Gender"} defaultMessage="Hello, World!" />
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.gender}
            onChange={(event) =>
              handleInputChange("gender", event.target.value)
            } // Update the name state
            label={
              <FormattedMessage id={"Gender"} defaultMessage="Hello, World!" />
            }
          >
            <MenuItem value={"ذكر"}>
              <FormattedMessage id={"male"} defaultMessage="Hello, World!" />
            </MenuItem>
            <MenuItem value={"انثى"}>
              <FormattedMessage id={"female"} defaultMessage="Hello, World!" />
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-required"
          size="small"
          value={formData.weight}
          onChange={(event) => {
            if (/^\d*\.?\d*$/.test(event.target.value)) {
              handleInputChange("weight", event.target.value);
            } // Update the name state
          }}
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Weight"} defaultMessage="Hello, World!" />
          }
          type="text" // Specifies that the input should accept numeric values
        />
        <TextField
          dir="rtl"
          id="outlined-required"
          size="small"
          value={formData.length}
          onChange={(event) => handleInputChange("length", event.target.value)} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Length"} defaultMessage="Hello, World!" />
          }
          type="number" // Specifies that the input should accept numeric values
        />
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">
            <FormattedMessage id={"bloodType"} defaultMessage="Hello, World!" />
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.bloodType}
            onChange={(event) =>
              handleInputChange("bloodType", event.target.value)
            } // Update the name state
            label={
              <FormattedMessage
                id={"bloodType"}
                defaultMessage="Hello, World!"
              />
            }
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
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">
            <FormattedMessage
              id={"MaritalStatus"}
              defaultMessage="Hello, World!"
            />
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.MaritalStatus}
            onChange={(event) =>
              handleInputChange("MaritalStatus", event.target.value)
            } // Update the name state
            label={
              <FormattedMessage
                id={"MaritalStatus"}
                defaultMessage="Hello, World!"
              />
            }
          >
            <MenuItem value={"متزوج"}>متزوج</MenuItem>
            <MenuItem value={"اعزب"}>اعزب</MenuItem>
            <MenuItem value={"مطلق"}>مطلق</MenuItem>
            <MenuItem value={"ارمل"}>ارمل</MenuItem>
          </Select>
        </FormControl>
        {formData.gender === "انثى" ? (
          <TextField
            // required
            id="outlined-required"
            size="small"
            value={formData.numberOfChildren}
            onChange={(event) =>
              handleInputChange("numberOfChildren", event.target.value)
            } // Update the name state
            sx={{
              width: "20%",
              textAlign: "right",
              color: "#fff",
            }}
            label={
              <FormattedMessage
                id={"numberOfChildren"}
                defaultMessage="Hello, World!"
              />
            }
            type="number"
            InputProps={{
              style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
            }}
          />
        ) : (
          ""
        )}
      </div>

      <div className=" flex w-full gap-4 items-center">
        <TextField
          id="outlined-required"
          size="small"
          value={formData.age}
          onChange={(event) => {
            if (/^\d*\.?\d*$/.test(event.target.value)) {
              handleInputChange("age", event.target.value);
            } // Update the name state
          }}
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={<FormattedMessage id={"Age"} defaultMessage="Hello, World!" />}
          type="text" // Specifies that the input should accept numeric values
        />
        <TextField
          id="outlined-required"
          size="small"
          value={formData.monthAge}
          onChange={(event) => {
            // Check if the parsed value is a valid number
            if (/^\d*\.?\d*$/.test(event.target.value)) {
              handleInputChange("monthAge", event.target.value);
            }
          }} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"monthAge"} defaultMessage="Hello, World!" />
          }
        />
        <TextField
          id="outlined-required"
          size="small"
          value={formData.dayAge}
          onChange={(event) => {
            // Check if the parsed value is a valid number
            if (/^\d*\.?\d*$/.test(event.target.value)) {
              handleInputChange("dayAge", event.target.value);
            }
          }} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"dayAge"} defaultMessage="Hello, World!" />
          }
        />
        <div style={{ direction: "ltr" }}>
          <LocalizationProvider
            size="small"
            className=" w-full"
            sx={{ height: 10 }}
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              openTo="year"
              views={["year", "month", "day"]}
              label="المواليد"
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                handleDateChange(newValue.$d);
              }}
              size="small"
              // defaultValue={dayjs()}
            />
          </LocalizationProvider>
        </div>
      </div>
      {formData.numberOfChildren > 0 ? (
        <div className=" text-right w-full">
          <h5>
            {/* <FormattedMessage
                id={"additional information"}
                defaultMessage="Hello, World!"
              /> */}
            تفاصيل الولادات
          </h5>
        </div>
      ) : (
        ""
      )}
      <div className=" flex flex-wrap w-full gap-4 items-center">
        {renderChildFields()}
      </div>

      {props.currentUser.role === "doctor" ? (
        <>
          <div className=" text-right w-full">
            <h5>
              <FormattedMessage
                id={"Medical History"}
                defaultMessage="Hello, World!"
              />
            </h5>
          </div>
          <div className=" w-full">
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
              id="tags-filled"
              value={historyPatient}
              onChange={(event, newValue) => {
                handleChange(event, newValue);
                setHistoryPatient(newValue);
              }}
              options={props.constantDiseases.map((option) => option.name)}
              // defaultValue={[top100Films[13].title]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    color="success"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%" }}
                  label={
                    <FormattedMessage
                      id={"Present Medical"}
                      defaultMessage="Hello, World!"
                    />
                  }
                  placeholder="Favorites"
                />
              )}
            />
          </div>
          <div className=" text-right w-full">
            <h5>
              <FormattedMessage
                id={"Allergy to medications"}
                defaultMessage="Hello, World!"
              />
            </h5>
          </div>
          <TextField
            dir="rtl"
            id="outlined-required"
            size="small"
            value={formData.fumbling}
            onChange={(event) =>
              handleInputChange("fumbling", event.target.value)
            } // Update the name state
            sx={{
              width: "100%",
              color: "#fff",
            }}
            label={
              <FormattedMessage
                id={"Allergy to medications"}
                defaultMessage="Hello, World!"
              />
            }
          />
        </>
      ) : (
        ""
      )}
      <TextField
        size="small"
        value={formData.description}
        onChange={(event) =>
          handleInputChange("description", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        label={<FormattedMessage id={"Notes"} defaultMessage="Hello, World!" />}
      />
      {userAvailableCheck ? (
        <p className=" text-red-600 font-semibold">هذا المستخدم موجود</p>
      ) : (
        ""
      )}
      {props.type === "edit" ? (
        <Button
          disabled={userAvailableCheck}
          type="submit"
          variant="contained"
          className="w-full"
          color="success"
        >
          <FormattedMessage id={"Edit patient"} defaultMessage="Hello, World!" />
        </Button>
      ) : (
        <Button
          disabled={userAvailableCheck}
          type="submit"
          variant="contained"
          className="w-full"
          color="success"
        >
          <FormattedMessage id={"New patient"} defaultMessage="Hello, World!" />
        </Button>
      )}
    </form>
  );
}

export default NewPatientForm;
