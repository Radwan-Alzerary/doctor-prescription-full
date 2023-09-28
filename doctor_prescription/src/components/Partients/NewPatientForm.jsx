import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// اضافة مريض جديد
function NewPatientForm(props) {
  const [personName, setPersonName] = useState([]);
  const [historyPatient,setHistoryPatient] = useState([])
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleChange = (event,value) => {
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
    weight: "",
    description: "",
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
        direction: locale === 'en' ? 'ltr' : 'rtl',
      }}
  >
      <div className=" text-right w-full">
        <h5>المعلومات الشخصية</h5>
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
          label="اسم المريض"
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
          label="رقم الهاتف"
          // defaultValue="Hello World"
          type="number"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          // required
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
          label="العنوان"
          // defaultValue="Hello World"
        />
      </div>
      <div className=" text-right w-full">
        <h5>معلومات اضافية</h5>
      </div>

      <div className=" flex w-full gap-4 items-center">
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">الجنس</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formData.gender}
            onChange={(event) =>
              handleInputChange("gender", event.target.value)
            } // Update the name state
            label="الجنس"
            // onChange={handleAgeChange}
          >
            <MenuItem value={"ذكر"}>ذكر</MenuItem>
            <MenuItem value={"انثى"}>انثى</MenuItem>
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
          label="العمر"
          type="number" // Specifies that the input should accept numeric values
          // defaultValue="Hello World"
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
          label="الوزن"
          type="number" // Specifies that the input should accept numeric values
          // defaultValue="Hello World"
        />
        <TextField
          dir="rtl"
          // required
          id="outlined-required"
          size="small"
          onChange={(event) => handleInputChange("length", event.target.value)} // Update the name state
          sx={{
            width: "33%",
            color: "#fff",
          }}
          label="الطول"
          type="number" // Specifies that the input should accept numeric values
          // defaultValue="Hello World"
        />
      </div>
      {props.currentUser.role === "doctor" ? (
        <>
          <div className=" text-right w-full">
            <h5>التاريخ المرضي</h5>
          </div>
          {/* <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">الامراض</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value.constantDiseasesId}
                      color="success"
                      label={JSON.parse(value).constantDiseasesName}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.constantDiseases.map((constantDiseases) => (
                <MenuItem
                  key={constantDiseases._id}
                  value={`{"constantDiseasesId":"${constantDiseases._id}","constantDiseasesName":"${constantDiseases.name}"}`}
                >
                  {constantDiseases.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <div className=" w-full">
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
              id="tags-filled"
              onChange={(event, newValue) => {
                handleChange(event, newValue)
                setHistoryPatient(newValue)
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
                  label="الامراض"
                  placeholder="Favorites"
                />
              )}
            />
          </div>

          <div className=" text-right w-full">
            <h5>التحسس من الادوية</h5>
          </div>
          <TextField
            dir="rtl"
            // required
            id="outlined-required"
            size="small"
            onChange={(event) =>
              handleInputChange("fumbling", event.target.value)
            } // Update the name state
            sx={{
              width: "100%",
              color: "#fff",
            }}
            label="التحسس"
            // defaultValue="Hello World"
          />
        </>
      ) : (
        ""
      )}
      <TextField
        // id="outlined-required"
        size="small"
        onChange={(event) =>
          handleInputChange("description", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          color: "#fff",
        }}
        label="الملاحظات"
        // defaultValue="Hello World"
      />

      <Button
        type="submit"
        variant="contained"
        className="w-full"
        color="success"
      >
        اضافة مريض
      </Button>
    </form>
  );
}

export default NewPatientForm;
