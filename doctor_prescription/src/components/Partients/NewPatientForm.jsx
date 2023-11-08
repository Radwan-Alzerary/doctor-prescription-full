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
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function NewPatientForm(props) {
  const [historyPatient, setHistoryPatient] = useState([]);
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleChange = (event, value) => {
    setFormData({
      ...formData,
      diseases: value, // Assuming you want them as a comma-separated string
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    phonNumber: "",
    adresses: "",
    gender: "ذكر",
    age: "",
    monthAge: "",
    weight: "",
    description: "",
    fumbling: "",
    diseases: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(formData);
  };

  // Handle changes in form fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
          onChange={(event) => handleInputChange("name", event.target.value)} // Update the name state
          sx={{
            width: "30%",
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
          onChange={(event) => handleInputChange("age", event.target.value)} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={<FormattedMessage id={"Age"} defaultMessage="Hello, World!" />}
          type="number" // Specifies that the input should accept numeric values
        />
        <TextField
          id="outlined-required"
          size="small"
          onChange={(event) =>
            handleInputChange("monthAge", event.target.value)
          } // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"monthAge"} defaultMessage="Hello, World!" />
          }
          type="number" // Specifies that the input should accept numeric values
        />

        <TextField
          // required
          id="outlined-required"
          size="small"
          onChange={(event) => handleInputChange("weight", event.target.value)} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"Weight"} defaultMessage="Hello, World!" />
          }
          type="number" // Specifies that the input should accept numeric values
        />
        <TextField
          dir="rtl"
          id="outlined-required"
          size="small"
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
              {" "}
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
        onChange={(event) =>
          handleInputChange("description", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        label={<FormattedMessage id={"Notes"} defaultMessage="Hello, World!" />}
      />

      <Button
        type="submit"
        variant="contained"
        className="w-full"
        color="success"
      >
        <FormattedMessage id={"New patient"} defaultMessage="Hello, World!" />
      </Button>
    </form>
  );
}

export default NewPatientForm;
