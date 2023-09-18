import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import {useEffect, useState } from "react";

function MedicalForm(props) {

  const [formData, setFormData] = useState({
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
  return (
    <form
      className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]  gap-5 items-center w-3/5 bg-white p-5 rounded-xl z-50"
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
    >
      <div className="w-full flex gap-9"></div>
      <div className=" text-right w-full">
        <h5>التشخيص الطبي</h5>
      </div>
      <TextField
        dir="rtl"
        value={formData.medicalDiagnosis}
        onChange={(event) => {
          handleInputChange("medicalDiagnosis",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="تفاصيل التشخيص"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
       <TextField
        dir="rtl"
        value={formData.currentMedicalHistory}

        onChange={(event) => {
          handleInputChange("currentMedicalHistory",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ المرضي الحالي "
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
      <TextField
        dir="rtl"
        value={formData.medicalHistory}

        onChange={(event) => {
          handleInputChange("medicalHistory",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ المرضي "
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />
      <TextField
        dir="rtl"
        value={formData.previousSurgeries}

        onChange={(event) => {
          handleInputChange("previousSurgeries",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="العمليات الجراحية السابقة"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <TextField
        dir="rtl"
        value={formData.familyHistory}

        onChange={(event) => {
          handleInputChange("familyHistory",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التاريخ العائلي"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />

      <TextField
        dir="rtl"
        value={formData.fumbling}

        onChange={(event) => {
          handleInputChange("fumbling",event.target.value);
        }}
        id="outlined-multiline-static"
        size="small"
        sx={{
          width: "100%",
          direction: "rtl",
          textAlign: "right",
          color: "#fff",
        }}
        multiline
        rows={2}
        label="التحسس من الادوية"
        // defaultValue="Hello World"
        InputProps={{
          style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
        }}
      />


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
          اضافة طبلة للمريض
        </Button>
        {/* <IconButton onClick={props.onPrinterClick}>
          <PrintRounded color="action"></PrintRounded>
        </IconButton> */}
      </div>
    </form>
  );
}

export default MedicalForm;
