import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

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

function NewPharmaceuticalForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dose: "",
    doseCount: "",
    intaketime: "",
    manufactoy: "",
    description: "",
    anotherIntaketime: "",
  });

  const [showInTakeOtherInput, setShowInTakeOtherInput] = useState(false);
  // Handle form submission
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

  const handleInTakeTimeInputChange = (value) => {
    if (value === "other") {
      console.log("hi vithc");
      setShowInTakeOtherInput(true);
      handleInputChange("intaketime", "");
    } else {
      setShowInTakeOtherInput(false);
      handleInputChange("intaketime", value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
      //   onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
      <div className=" text-right w-full">
        <h5>معلومات الدواء</h5>
      </div>
      <div className="flex gap-4  w-full">
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.name}
          onChange={(event) => handleInputChange("name", event.target.value)} // Update the name state
          sx={{
            width: "50%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="اسم الدواء"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">الصنف</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            // required
            value={formData.category}
            onChange={(event) =>
              handleInputChange("category", event.target.value)
            } // Update the name state
            label="الصنف"
            // onChange={handleAgeChange}
          >
            {props.categoryList.map((category, index) => (
              <MenuItem value={category._id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className=" text-right w-full">
        <h5>معلومات صحية</h5>
      </div>

      <div className=" flex w-full gap-4 items-center">
        <TextField
          dir="rtl"
          
          id="outlined-required"
          size="small"
          value={formData.dose}
          onChange={(event) => handleInputChange("dose", event.target.value)} // Update the name state
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
        <TextField
          dir="rtl"
          
          id="outlined-required"
          size="small"
          value={formData.doseCount}
          onChange={(event) =>
            handleInputChange("doseCount", event.target.value)
          } // Update the name state
          sx={{
            width: "41%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="عدد الجرع"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
      </div>
      <div className="w-full flex gap-3">
        <FormControl className=" w-1/3 bg-whiteh" size="small">
          <InputLabel id="demo-simple-select-helper-label">
            وقت التناول
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            label="وقت التناول"
            onChange={(event) =>
              handleInTakeTimeInputChange(event.target.value)
            } // Update the name state
          >
            {props.inTakeTimeList.map((inTakeTime, index) => (
              <MenuItem value={inTakeTime._id}>{inTakeTime.name}</MenuItem>
            ))}
            <MenuItem value={"other"}>اخرى</MenuItem>
          </Select>
        </FormControl>
        <TextField
          dir="rtl"
          // required
          id="outlined-required"
          size="small"
          sx={{
            width: "50%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label="شركة الصنع"
          // defaultValue="Hello World"
          value={formData.manufactoy}
          onChange={(event) =>
            handleInputChange("manufactoy", event.target.value)
          } // Update the name state
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
      </div>

      {showInTakeOtherInput ? (
        <div className="w-full ">
          <TextField
            dir="rtl"
            required
            id="outlined-required"
            size="small"
            value={formData.anotherIntaketime}
            onChange={(event) =>
              handleInputChange("anotherIntaketime", event.target.value)
            } // Update the name state
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
        </div>
      ) : (
        ""
      )}
      <div className=" text-right w-full">
        <h5>ملاحضات</h5>
      </div>
      <TextField
        dir="rtl"
        id="outlined-required"
        size="small"
        value={formData.description}
        onChange={(event) =>
          handleInputChange("description", event.target.value)
        } // Update the name state
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        label="الملاحضات"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <Button
        type="submit"
        variant="contained"
        className="w-full"
        color="success"
      >
        اتمام
      </Button>
    </form>
  );
}

export default NewPharmaceuticalForm;
